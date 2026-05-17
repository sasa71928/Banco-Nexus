const API = "http://25.2.89.114:3000";

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
