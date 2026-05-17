const API = "http://192.168.0.104:3000";

async function retiroGDL() {

  const res = await fetch(`${API}/api/retiro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      numeroCuenta: "1002003001",
      monto: 14000,
      descripcion: "Retiro desde GDL",
      sucursal: "GDL"
    })
  });

  return await res.json();
}

module.exports = retiroGDL;
