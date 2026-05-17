const cdmx = require("./sucursalCDMX");
const gdl = require("./sucursalGDL");
const mty = require("./sucursalMTY");
const tij = require("./sucursalTIJ");
const pue = require("./sucursalPUE");

async function ejecutar() {

  console.log("=== INICIANDO OPERACIONES CONCURRENTES DE CONSULTA ===");

  const resultados = await Promise.all([
    cdmx(),
    gdl(),
    mty(),
    tij(),
    pue()
  ]);

  console.log(resultados);

  console.log("=== OPERACIONES DE CONSULTA FINALIZADAS ===");
}

ejecutar();
