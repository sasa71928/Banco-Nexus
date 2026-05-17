const depositoCDMX = require("./sucursalCDMX.JS");
const depositoGDL  = require("./sucursalGDL.JS");
const depositoMTY  = require("./sucursalMTY.JS");
const depositoPUE  = require("./sucursalPUE.JS");
const depositoTIJ  = require("./sucursalTIJ.JS");

async function correrSimulaciones() {
  console.log("==================================================");
  console.log("  INICIANDO SIMULACIONES MULTI-SUCURSAL DE BANCO NEXUS");
  console.log("==================================================\n");

  const simuladores = [
    { nombre: "CDMX (Ciudad de México)", fn: depositoCDMX },
    { nombre: "GDL (Guadalajara)", fn: depositoGDL },
    { nombre: "MTY (Monterrey)", fn: depositoMTY },
    { nombre: "PUE (Puebla)", fn: depositoPUE },
    { nombre: "TIJ (Tijuana)", fn: depositoTIJ }
  ];

  for (const simulador of simuladores) {
    try {
      console.log(`  Enviando depósito desde la sucursal ${simulador.nombre}...`);
      const resultado = await simulador.fn();
      
      if (resultado.ok) {
        console.log(`  EXITO [${simulador.nombre}]:`);
        console.log(`   - Operación: ${resultado.mensaje || "Completada"}`);
        console.log(`   - Cuenta: ${resultado.numeroCuenta}`);
        console.log(`   - Monto: $${resultado.montoDepositado} MXN`);
        console.log(`   - Saldo actual: $${resultado.saldoActual} MXN\n`);
      } else {
        console.log(`  ERROR [${simulador.nombre}]: ${resultado.error}\n`);
      }
    } catch (error) {
      console.log(`Error [${simulador.nombre}]: No se pudo conectar al servidor. Detalle: ${error.message}\n`);
    }
  }

  console.log("==================================================");
  console.log("🏁 SIMULACIÓN FINALIZADA");
  console.log("==================================================");
}

correrSimulaciones();
