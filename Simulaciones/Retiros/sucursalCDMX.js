const API = "http://25.2.89.114:3000";

async function retiroCDMX() {

  const res = await fetch(`${API}/api/retiro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      numeroCuenta: "1002003001",
      monto: 10000,
      descripcion: "Retiro desde CDMX",
      sucursal: "CDMX"
    })
  });

  return await res.json();
}

module.exports = retiroCDMX;
