const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI || "mongodb://mongo1:27017,mongo2:27017,mongo3:27017/?replicaSet=rs0";
const dbName = process.env.DB_NAME || "nexus_banca";

let client;
let db;

async function connectDB() {
  if (db) return db;

  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);

  console.log(`✅ Conectado a MongoDB — base: ${dbName}`);
  return db;
}

function getDB() {
  if (!db) {
    throw new Error("La base de datos aún no está conectada.");
  }
  return db;
}

module.exports = { connectDB, getDB };