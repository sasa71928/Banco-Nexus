const API = "http://25.2.89.114:3000";

async function retiroMTY() {

  const res = await fetch(`${API}/api/retiro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      numeroCuenta: "1002003002",
      monto: 1000,
      descripcion: "Retiro desde MTY",
      sucursal: "MTY"
    })
  });

  return await res.json();
}

module.exports = retiroMTY;
