const express = require("express");
const router = express.Router();
const { getDB } = require("../db");

// GET /api/test-db
router.get("/", async (req, res) => {
  try {
    const db = getDB();

    const totalClientes    = await db.collection("clientes").countDocuments();
    const totalCuentas     = await db.collection("cuentas").countDocuments();
    const totalTransacc    = await db.collection("transacciones").countDocuments();

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

module.exports = router;