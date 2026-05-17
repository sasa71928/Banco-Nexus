const { exec } = require("child_process");
const path = require("path");

function runScript(scriptPath) {
  return new Promise((resolve, reject) => {
    const folderName = path.basename(path.dirname(scriptPath));
    const fileName = path.basename(scriptPath);
    
    console.log(`\n--------------------------------------------------`);
    console.log(`🚀 Ejecutando simulaciones en: ${folderName}/${fileName}`);
    console.log(`--------------------------------------------------`);
    
    exec(`node "${scriptPath}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error al ejecutar ${folderName}/${fileName}: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`⚠️ stderr: ${stderr}`);
      }
      console.log(stdout);
      resolve();
    });
  });
}

async function ejecutarTodo() {
  try {
    const root = __dirname;
    
    console.log("==================================================");
    console.log("🏦 INICIANDO SUITE COMPLETA DE SIMULACIONES BANCO NEXUS");
    console.log("==================================================");
    
    // Ejecutar secuencialmente para mantener los logs limpios y legibles
    await runScript(path.join(root, "Depositos", "ejecutarSimulaciones.js"));
    await runScript(path.join(root, "Retiros", "ejecutarSimulaciones.js"));
    await runScript(path.join(root, "Consultas", "ejecutarSimulaciones.js"));
    
    console.log("==================================================");
    console.log("🎉 ¡TODAS LAS SIMULACIONES COMPLETADAS CON ÉXITO! 🎉");
    console.log("==================================================");
  } catch (err) {
    console.error("❌ Ocurrió un error ejecutando la suite de simulaciones:", err);
  }
}

ejecutarTodo();
