require("dotenv").config();
const express = require("express");
const cors    = require("cors");
const { connectDB } = require("./db");

const cuentaRoutes    = require("./routes/cuenta");
const depositoRoutes  = require("./routes/deposito");
const retiroRoutes    = require("./routes/retiro");
const eventosRoutes   = require("./routes/eventos");
const statusRoutes    = require("./routes/status");
const testDBRoutes    = require("./routes/testDB");
const historialRoutes = require("./routes/historial");

const app = express();

app.use(cors());
app.use(express.json());

// Ruta raíz
app.get("/", (req, res) => {
  res.json({ mensaje: "🏦 API Banco Nexus funcionando — Replica Set activo" });
});

// Rutas
app.use("/api/cuenta",    cuentaRoutes);
app.use("/api/deposito",  depositoRoutes);
app.use("/api/retiro",    retiroRoutes);
app.use("/api/events",    eventosRoutes);
app.use("/api/events/status", statusRoutes);
app.use("/api/test-db",   testDBRoutes);   // incluye /api/test-db/replica-status
app.use("/api/historial", historialRoutes);

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ ok: false, error: "Ruta no encontrada" });
});

// Arrancar servidor solo si MongoDB Replica Set conecta
const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Servidor en http://0.0.0.0:${PORT}`);
      console.log(`   GET  /api/test-db`);
      console.log(`   GET  /api/test-db/replica-status   ← Estado del Replica Set`);
      console.log(`   GET  /api/cuenta/:cuenta`);
      console.log(`   POST /api/deposito`);
      console.log(`   POST /api/retiro`);
    });
  })
  .catch((err) => {
    console.error("❌ No se pudo conectar al Replica Set MongoDB:", err.message);
    console.error("Verifica que los 3 nodos estén activos: 27017, 27018, 27019");
    process.exit(1);
  });