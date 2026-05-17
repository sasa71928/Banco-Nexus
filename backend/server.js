require("dotenv").config();
const express = require("express");
const cors    = require("cors");
const { connectDB } = require("./db");

const cuentaRoutes = require("./routes/cuenta");
const depositoRoutes = require("./routes/deposito");
const retiroRoutes = require("./routes/retiro");
const testDBRoutes = require("./routes/testDB");
const historialRoutes = require("./routes/historial");

const app = express();

app.use(cors());
app.use(express.json());

// Ruta raíz
app.get("/", (req, res) => {
  res.json({ mensaje: "🏦 API Banco Nexus funcionando" });
});

// Rutas
app.use("/api/cuenta", cuentaRoutes);
app.use("/api/deposito" , depositoRoutes);
app.use("/api/retiro" , retiroRoutes);
app.use("/api/test-db", testDBRoutes);
app.use("/api/historial", historialRoutes);

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ ok: false, error: "Ruta no encontrada" });
});

// Arrancar servidor solo si MongoDB conecta
const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Servidor en http://192.168.0.104:${PORT}`);
      console.log(`   GET /`);
      console.log(`   GET /api/test-db`);
      console.log(`   GET /api/cuenta/:cuenta`);
      console.log(`   POST /api/deposito`);
      console.log(`   POST /api/retiro`);
    });
  })
  .catch((err) => {
    console.error("❌ No se pudo conectar a MongoDB:", err.message);
    process.exit(1);
  });