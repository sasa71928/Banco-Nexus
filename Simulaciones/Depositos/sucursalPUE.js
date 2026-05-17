const API = "http://192.168.0.104:3000";

async function depositoPUE() {

  const res = await fetch(`${API}/api/deposito`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      numeroCuenta: "1002003004",
      monto: 800,
      descripcion: "Depósito desde PUE",
      sucursal: "PUE"
    })
  });

  return await res.json();
}

module.exports = depositoPUE;
