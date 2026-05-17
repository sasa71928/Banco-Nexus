const API = "http://192.168.0.104:3000";

async function depositoMTY() {

  const res = await fetch(`${API}/api/deposito`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      numeroCuenta: "1002003002",
      monto: 1000,
      descripcion: "Depósito desde MTY",
      sucursal: "MTY"
    })
  });

  return await res.json();
}

module.exports = depositoMTY;