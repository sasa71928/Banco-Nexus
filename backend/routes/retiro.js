const express = require("express");
const router  = express.Router();
const { getDB } = require("../db");
const { sendAccountUpdate } = require("../sse");

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

    // Verificar que la cuenta existe y está activa
    const cuentaExiste = await db
      .collection("cuentas")
      .findOne({ numeroCuenta: numeroCuenta.trim() });

    if (!cuentaExiste) {
      return res.status(404).json({
        ok: false,
        error: `No existe ninguna cuenta con el número '${numeroCuenta}'.`
      });
    }

    if (cuentaExiste.estatus !== "activa") {
      return res.status(400).json({
        ok: false,
        error: `La cuenta '${numeroCuenta}' no está activa (estatus: ${cuentaExiste.estatus}).`
      });
    }

    //Verifica saldo suficiente Y descuenta en un solo paso
    const cuentaActualizada = await db.collection("cuentas").findOneAndUpdate(
      {
        numeroCuenta: numeroCuenta.trim(),
        estatus: "activa",
        saldo: { $gte: montoNum }
      },
      {
        $inc: { saldo: -montoNum }
      },
      { returnDocument: "after" }
    );

    // Si no se actualizó, otra sucursal procesó un retiro simultáneo
    if (!cuentaActualizada) {
      return res.status(400).json({
        ok: false,
        error: "Saldo insuficiente para realizar el retiro. Es posible que otra sucursal haya procesado un retiro simultáneo.",
        saldoDisponible: cuentaExiste.saldo,
        montoSolicitado: montoNum
      });
    }

    const nuevoSaldo = cuentaActualizada.saldo;
    const saldoAnterior = nuevoSaldo + montoNum;

    // Registrar transacción
    const transaccion = {
      cuentaId:       cuentaActualizada._id,
      tipo:           "retiro",
      monto:          montoNum,
      fecha:          new Date(),
      descripcion:    descripcion || "Retiro vía API",
      sucursal:       sucursal || "Sucursal desconocida",
      saldoPosterior: nuevoSaldo
    };

    const resultado = await db.collection("transacciones").insertOne(transaccion);

    sendAccountUpdate(cuentaActualizada.numeroCuenta, {
      tipo: "retiro",
      numeroCuenta: cuentaActualizada.numeroCuenta,
      monto: montoNum,
      saldoActual: nuevoSaldo,
      fecha: transaccion.fecha
    });

    return res.status(201).json({
      ok: true,
      mensaje:       "Retiro realizado correctamente.",
      transaccionId: resultado.insertedId,
      numeroCuenta:  cuentaActualizada.numeroCuenta,
      montoRetirado: montoNum,
      saldoAnterior: saldoAnterior,
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