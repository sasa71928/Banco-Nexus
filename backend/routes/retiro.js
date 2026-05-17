const express = require("express");
const router  = express.Router();
const { getDB } = require("../db");

// POST /api/retiro
router.post("/", async (req, res) => {
  try {
    const db = getDB();
    const { numeroCuenta, monto, descripcion, sucursal } = req.body;

    if (!numeroCuenta || typeof numeroCuenta !== "string" || !numeroCuenta.trim()) {
      return res.status(400).json({
        ok: false,
        error: "Debes proporcionar un número de cuenta válido."
      });
    }

    if (monto === undefined || monto === null) {
      return res.status(400).json({ ok: false, error: "El campo 'monto' es obligatorio." });
    }

    const montoNum = Number(monto);
    if (isNaN(montoNum) || montoNum <= 0) {
      return res.status(400).json({
        ok: false,
        error: "El monto debe ser un número mayor a cero."
      });
    }

    //Buscar cuenta
    const cuenta = await db
      .collection("cuentas")
      .findOne({ numeroCuenta: numeroCuenta.trim() });

    if (!cuenta) {
      return res.status(404).json({
        ok: false,
        error: `No existe ninguna cuenta con el número '${numeroCuenta}'.`
      });
    }

    if (cuenta.estatus !== "activa") {
      return res.status(400).json({
        ok: false,
        error: `La cuenta '${numeroCuenta}' no está activa (estatus: ${cuenta.estatus}).`
      });
    }

    //Verificar saldo suficiente
    if (cuenta.saldo < montoNum) {
      return res.status(400).json({
        ok: false,
        error: "Saldo insuficiente para realizar el retiro.",
        saldoDisponible: cuenta.saldo,
        montoSolicitado: montoNum
      });
    }

    //Actualizar saldo
    const nuevoSaldo = cuenta.saldo - montoNum;

    await db.collection("cuentas").updateOne(
      { _id: cuenta._id },
      { $inc: { saldo: -montoNum } }
    );

    //Registrar transacción
    const transaccion = {
      cuentaId:       cuenta._id,
      tipo:           "retiro",
      monto:          montoNum,
      fecha:          new Date(),
      descripcion:    descripcion || "Retiro vía API",
      sucursal: sucursal || "Sucursal desconocida",
      saldoPosterior: nuevoSaldo
    };

    const resultado = await db.collection("transacciones").insertOne(transaccion);

    return res.status(201).json({
      ok: true,
      mensaje:       "Retiro realizado correctamente.",
      transaccionId: resultado.insertedId,
      numeroCuenta:  cuenta.numeroCuenta,
      montoRetirado: montoNum,
      saldoAnterior: cuenta.saldo,
      saldoActual:   nuevoSaldo
    });

  } catch (error) {
    console.error("Error en POST /api/retiro", error);
    return res.status(500).json({
      ok: false,
      error: "Error interno del servidor.",
      detalle: error.message
    });
  }
});

module.exports = router;