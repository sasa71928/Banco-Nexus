const express = require("express");
const router  = express.Router();
const { getDB, getClient, getReplicaStatus } = require("../db");

// GET /api/test-db — verifica colecciones básicas
router.get("/", async (req, res) => {
  try {
    const db = getDB();

    const totalClientes = await db.collection("clientes").countDocuments();
    const totalCuentas  = await db.collection("cuentas").countDocuments();
    const totalTransacc = await db.collection("transacciones").countDocuments();

    res.json({
      ok: true,
      mensaje: "Conexión a nexus_banca exitosa",
      colecciones: {
        clientes:      totalClientes,
        cuentas:       totalCuentas,
        transacciones: totalTransacc
      }
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: "No se pudo acceder a la base de datos.",
      detalle: error.message
    });
  }
});

// GET /api/test-db/replica-status
// Muestra el estado real del Replica Set: nodo primario, secundarios.
router.get("/replica-status", async (req, res) => {
  try {
    const db     = getDB();
    const client = getClient();
    const estado = getReplicaStatus();

    // Obtener estado del replica set desde MongoDB
    const adminDB  = client.db("admin");
    const rsStatus = await adminDB.command({ replSetGetStatus: 1 });

    const miembros = rsStatus.members.map((m) => ({
      id:     m._id,
      nombre: m.name,
      estado: m.stateStr,        // PRIMARY, SECONDARY, DOWN, etc.
      salud:  m.health === 1 ? "✅ online" : "🔴 offline",
      optime: m.optimeDate
    }));

    const primario = miembros.find((m) => m.estado === "PRIMARY");

    // Prueba de escritura
    const colPrueba = db.collection("_replica_test");
    const docPrueba = { prueba: true, timestamp: new Date(), origen: "Etapa3-Backend" };
    const insertado = await colPrueba.insertOne(docPrueba);

    // Prueba de lectura
    const leido = await colPrueba.findOne({ _id: insertado.insertedId });

    // Limpia el documento de prueba
    await colPrueba.deleteOne({ _id: insertado.insertedId });

    res.json({
      ok: true,
      replicaSet:       rsStatus.set,
      primario:         primario ? primario.nombre : "⚠️ Sin primario detectado",
      miembros,
      prueba_escritura: insertado.acknowledged ? "✅ exitosa" : "❌ falló",
      prueba_lectura:   leido ? "✅ exitosa" : "❌ falló",
      alerta_nodo:      estado.primaryCaido,
      ultimo_evento:    estado.ultimoEvento,
      ultimo_error:     estado.ultimoError
    });
  } catch (error) {
    // Si el replica set no está activo, responde con diagnóstico útil
    res.status(503).json({
      ok: false,
      error: "No se pudo consultar el estado del Replica Set.",
      detalle: error.message,
      sugerencia: "Asegúrate de que los 3 nodos estén activos y rsBanco esté iniciado."
    });
  }
});

module.exports = router;s