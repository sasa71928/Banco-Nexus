const API = "http://25.2.89.114:3000";

async function consultaPUE() {
  const numeroCuenta = "1002003004";
  
  const res = await fetch(`${API}/api/cuenta/${numeroCuenta}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  return await res.json();
}

module.exports = consultaPUE;
