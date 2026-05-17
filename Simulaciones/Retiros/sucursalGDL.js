const API = "http://25.2.89.114:3000";

async function retiroGDL() {

  const res = await fetch(`${API}/api/retiro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      numeroCuenta: "1002003001",
      monto: 10000,
      descripcion: "Retiro desde GDL",
      sucursal: "GDL"
    })
  });

  return await res.json();
}

module.exports = retiroGDL;
