const API = "http://192.168.0.104:3000";

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
