const API = "http://25.2.89.114:3000";

async function retiroTIJ() {

  const res = await fetch(`${API}/api/retiro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      numeroCuenta: "1002003005",
      monto: 2000,
      descripcion: "Retiro desde TIJ",
      sucursal: "TIJ"
    })
  });

  return await res.json();
}

module.exports = retiroTIJ;
