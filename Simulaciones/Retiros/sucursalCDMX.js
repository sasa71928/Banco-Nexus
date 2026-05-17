const API = "http://192.168.0.104:3000";

async function retiroCDMX() {

  const res = await fetch(`${API}/api/retiro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      numeroCuenta: "1002003001",
      monto: 1500,
      descripcion: "Retiro desde CDMX",
      sucursal: "CDMX"
    })
  });

  return await res.json();
}

module.exports = retiroCDMX;
