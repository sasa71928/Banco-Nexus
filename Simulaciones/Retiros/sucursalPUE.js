const API = "http://192.168.0.104:3000";

async function retiroPUE() {

  const res = await fetch(`${API}/api/retiro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      numeroCuenta: "1002003004",
      monto: 800,
      descripcion: "Retiro desde PUE",
      sucursal: "PUE"
    })
  });

  return await res.json();
}

module.exports = retiroPUE;
