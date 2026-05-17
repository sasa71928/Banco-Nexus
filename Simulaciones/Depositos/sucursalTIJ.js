const API = "http://192.168.0.104:3000";

async function depositoTIJ() {

  const res = await fetch(`${API}/api/deposito`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      numeroCuenta: "1002003005",
      monto: 2000,
      descripcion: "Depósito desde TIJ",
      sucursal: "TIJ"
    })
  });

  return await res.json();
}

module.exports = depositoTIJ;
