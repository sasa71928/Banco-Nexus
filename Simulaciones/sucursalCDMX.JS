const API = "http://192.168.0.104:3000";

async function depositoCDMX() {

  const res = await fetch(`${API}/api/deposito`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      numeroCuenta: "1002003001",
      monto: 500,
      descripcion: "Depósito desde CDMX",
      sucursal: "CDMX"
    })
  });

  return await res.json();
}

module.exports = depositoCDMX;