const express = require("express");
const router = express.Router();
const { getDB } = require("../db");

router.get("/:cuenta", async (req, res) => {
  try {
    const db = getDB();
    const numeroCuenta = req.params.cuenta;

    const cuenta = await db.collection("cuentas").findOne({
      numeroCuenta
    });

    if (!cuenta) {
      return res.status(404).json({
        ok: false,
        error: "Cuenta no encontrada"
      });
    }

    const historial = await db.collection("transacciones")
      .find({ cuentaId: cuenta._id })
      .sort({ fecha: -1 })
      .toArray();

    res.json({
      ok: true,
      historial
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});

module.exports = router;