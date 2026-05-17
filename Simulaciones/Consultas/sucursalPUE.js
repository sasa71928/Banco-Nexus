const API = "http://192.168.0.104:3000";

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
