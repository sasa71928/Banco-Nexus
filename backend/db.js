const { MongoClient } = require("mongodb");

const uri =
  process.env.MONGO_URI ||
  "mongodb://localhost:27017,localhost:27018,localhost:27019/?replicaSet=rsBanco";

const dbName = process.env.DB_NAME || "nexus_banca";

let client;
let db;

const replicaStatus = {
  primaryCaido: false,
  ultimoEvento: null,
  ultimoError: null
};

async function connectDB() {
  if (db) return db;

  client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    heartbeatFrequencyMS: 2000,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    retryWrites: true,
    retryReads: true
  });

  // Detecta cambios de rol
  client.on("serverDescriptionChanged", (event) => {
    const tipo = event.newDescription.type;
    const direccion = event.address;
    replicaStatus.ultimoEvento = { direccion, tipo, timestamp: new Date().toISOString() };
    console.warn(`Cambio en topología: [${direccion}] → ${tipo}`);

    if (tipo === "Unknown" || tipo === "RSGhost") {
      replicaStatus.primaryCaido = true;
      replicaStatus.ultimoError = `Nodo ${direccion} no responde (${tipo})`;
    } else {
      replicaStatus.primaryCaido = false;
      replicaStatus.ultimoError = null;
    }
  });

  //Nodo posiblemente caído
  client.on("serverHeartbeatFailed", (event) => {
    console.error(`Heartbeat fallido en [${event.connectionId}]:`, event.failure?.message);
    replicaStatus.primaryCaido = true;
    replicaStatus.ultimoError = `Heartbeat fallido en ${event.connectionId}`;
  });

  // Heartbeat restaurado
  client.on("serverHeartbeatSucceeded", (event) => {
    if (replicaStatus.primaryCaido) {
      console.log(`Heartbeat restaurado en [${event.connectionId}]`);
      replicaStatus.primaryCaido = false;
      replicaStatus.ultimoError = null;
    }
  });

  try {
    await client.connect();
    db = client.db(dbName);
    console.log(`✅ Conectado a MongoDB Replica Set — base: ${dbName}`);
    return db;
  } catch (err) {
    console.error("❌ Error al conectar con el Replica Set:", err.message);
    throw err;
  }
}

function getDB() {
  if (!db) throw new Error("La base de datos aún no está conectada.");
  return db;
}

function getClient() { return client; }
function getReplicaStatus() { return replicaStatus; }

module.exports = { connectDB, getDB, getClient, getReplicaStatus };