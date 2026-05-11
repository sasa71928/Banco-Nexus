import { useState } from "react";

const API_BASE = "http://localhost:3000";

const SAMPLE_ACCOUNTS = ["1002003001","1002003002","1002003003","1002003004","1002003005"];

function formatCurrency(amount) {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(amount);
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric" });
}

function formatDateTime(dateStr) {
  return new Date(dateStr).toLocaleString("es-MX", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
}

const TIPO_LABELS = { debito: "Débito", ahorro: "Ahorro", nomina: "Nómina" };
const TIPO_COLORS = {
  debito: { bg: "#E6F1FB", text: "#0C447C", dot: "#378ADD" },
  ahorro: { bg: "#EAF3DE", text: "#27500A", dot: "#639922" },
  nomina: { bg: "#FAEEDA", text: "#633806", dot: "#BA7517" },
};

function Avatar({ nombre, apellido }) {
  const initials = `${nombre?.[0] ?? ""}${apellido?.[0] ?? ""}`.toUpperCase();
  return (
    <div style={{
      width: 48, height: 48, borderRadius: "50%",
      background: "#E6F1FB", color: "#0C447C",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'DM Serif Display', Georgia, serif",
      fontWeight: 400, fontSize: 18, flexShrink: 0,
      border: "0.5px solid #B5D4F4"
    }}>{initials}</div>
  );
}

function TipoBadge({ tipo }) {
  const c = TIPO_COLORS[tipo] ?? { bg: "#F1EFE8", text: "#5F5E5A", dot: "#888780" };
  return (
    <span style={{
      background: c.bg, color: c.text,
      fontSize: 11, fontWeight: 500, letterSpacing: "0.04em",
      padding: "3px 8px", borderRadius: 4,
      display: "inline-flex", alignItems: "center", gap: 5,
      textTransform: "uppercase"
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.dot, flexShrink: 0 }} />
      {TIPO_LABELS[tipo] ?? tipo}
    </span>
  );
}

function MetricCard({ label, value, sub }) {
  return (
    <div style={{
      background: "var(--color-background-secondary)",
      borderRadius: 8, padding: "14px 16px", flex: 1, minWidth: 120
    }}>
      <p style={{ margin: 0, fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 4 }}>{label}</p>
      <p style={{ margin: 0, fontSize: 22, fontWeight: 500, color: "var(--color-text-primary)", fontFamily: "'DM Serif Display', Georgia, serif" }}>{value}</p>
      {sub && <p style={{ margin: "3px 0 0", fontSize: 11, color: "var(--color-text-tertiary)" }}>{sub}</p>}
    </div>
  );
}

function TransactionRow({ tx }) {
  const isDeposit = tx.tipo === "deposito";
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "10px 0", borderBottom: "0.5px solid var(--color-border-tertiary)"
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
        background: isDeposit ? "#EAF3DE" : "#FCEBEB",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 14, color: isDeposit ? "#3B6D11" : "#A32D2D"
      }}>
        {isDeposit ? "↓" : "↑"}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {tx.descripcion}
        </p>
        <p style={{ margin: 0, fontSize: 11, color: "var(--color-text-tertiary)" }}>{formatDateTime(tx.fecha)}</p>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: isDeposit ? "#3B6D11" : "#A32D2D" }}>
          {isDeposit ? "+" : "−"}{formatCurrency(tx.monto)}
        </p>
        <p style={{ margin: 0, fontSize: 11, color: "var(--color-text-tertiary)" }}>
          Saldo: {formatCurrency(tx.saldoPosterior)}
        </p>
      </div>
    </div>
  );
}

export default function BancoNexus() {
  const [numeroCuenta, setNumeroCuenta] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleConsulta(e) {
    e?.preventDefault();
    const cuenta = numeroCuenta.trim();
    if (!cuenta) return;
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await fetch(`${API_BASE}/api/cuenta/${cuenta}`);
      const json = await res.json();
      if (!json.ok) throw new Error(json.error ?? "Error desconocido");
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSample(num) {
    setNumeroCuenta(num);
    const cuenta = numeroCuenta.trim();
    if (!cuenta) return;
    setError(null);
    setData(null);
    try {
      const res = await fetch(`${API_BASE}/api/cuenta/${cuenta}`);
      const json = await res.json();
      if (!json.ok) throw new Error(json.error ?? "Error desconocido");
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const depositos = data?.transacciones?.filter(t => t.tipo === "deposito") ?? [];
  const retiros = data?.transacciones?.filter(t => t.tipo === "retiro") ?? [];
  const totalDepositos = depositos.reduce((s, t) => s + t.monto, 0);
  const totalRetiros = retiros.reduce((s, t) => s + t.monto, 0);

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", maxWidth: 680, margin: "0 auto", padding: "2rem 1rem" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=DM+Serif+Display&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "2rem" }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: "#185FA5", display: "flex", alignItems: "center", justifyContent: "center",
          color: "#E6F1FB", fontSize: 18, fontFamily: "'DM Serif Display', serif"
        }}>N</div>
        <div>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 400, fontFamily: "'DM Serif Display', Georgia, serif", color: "var(--color-text-primary)" }}>
            Banco Nexus
          </h1>
          <p style={{ margin: 0, fontSize: 12, color: "var(--color-text-secondary)" }}>Consulta de cuenta</p>
        </div>
      </div>

      {/* Search form */}
      <div style={{
        background: "var(--color-background-primary)",
        border: "0.5px solid var(--color-border-tertiary)",
        borderRadius: 12, padding: "1.25rem"
      }}>
        <p style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)" }}>
          Número de cuenta
        </p>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            type="text"
            placeholder="Ej. 1002003001"
            value={numeroCuenta}
            onChange={e => setNumeroCuenta(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleConsulta()}
            style={{ flex: 1, fontFamily: "inherit" }}
          />
          <button
            onClick={handleConsulta}
            disabled={loading || !numeroCuenta.trim()}
            style={{
              background: loading ? "var(--color-background-secondary)" : "#185FA5",
              color: loading ? "var(--color-text-secondary)" : "#E6F1FB",
              border: "none", borderRadius: 8, padding: "0 18px",
              fontSize: 13, fontWeight: 500, cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "inherit", transition: "background 0.15s"
            }}
          >
            {loading ? "Buscando..." : "Consultar"}
          </button>
        </div>

        {/* Quick access */}
        <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>Acceso rápido:</span>
          {SAMPLE_ACCOUNTS.map(num => (
            <button
              key={num}
              onClick={() => handleSample(num)}
              style={{
                background: "var(--color-background-secondary)", border: "0.5px solid var(--color-border-tertiary)",
                borderRadius: 4, padding: "2px 8px", fontSize: 11, cursor: "pointer",
                color: "var(--color-text-secondary)", fontFamily: "inherit"
              }}
            >{num}</button>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div style={{
          marginTop: "1rem", padding: "12px 16px",
          background: "#FCEBEB", border: "0.5px solid #F7C1C1", borderRadius: 8,
          fontSize: 13, color: "#791F1F", display: "flex", gap: 8, alignItems: "center"
        }}>
          <span style={{ fontSize: 16 }}>⚠</span> {error}
        </div>
      )}

      {/* Results */}
      {data && (
        <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>

          {/* Client + account header */}
          <div style={{
            background: "var(--color-background-primary)",
            border: "0.5px solid var(--color-border-tertiary)",
            borderRadius: 12, padding: "1.25rem"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <Avatar nombre={data.cliente?.nombre} apellido={data.cliente?.apellidoPaterno} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <h2 style={{ margin: 0, fontSize: 17, fontWeight: 400, fontFamily: "'DM Serif Display', serif", color: "var(--color-text-primary)" }}>
                    {data.cliente?.nombre} {data.cliente?.apellidoPaterno} {data.cliente?.apellidoMaterno}
                  </h2>
                  <TipoBadge tipo={data.cuenta?.tipoCuenta} />
                </div>
                <p style={{ margin: "3px 0 0", fontSize: 12, color: "var(--color-text-tertiary)" }}>
                  {data.cliente?.correo} · {data.cliente?.telefono}
                </p>
              </div>
            </div>

            <div style={{ borderTop: "0.5px solid var(--color-border-tertiary)", paddingTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <MetricCard
                label="Saldo disponible"
                value={formatCurrency(data.cuenta?.saldo)}
                sub={data.cuenta?.moneda}
              />
              <MetricCard
                label="Total depósitos"
                value={formatCurrency(totalDepositos)}
                sub={`${depositos.length} movimiento${depositos.length !== 1 ? "s" : ""}`}
              />
              <MetricCard
                label="Total retiros"
                value={formatCurrency(totalRetiros)}
                sub={`${retiros.length} movimiento${retiros.length !== 1 ? "s" : ""}`}
              />
            </div>

            <div style={{ marginTop: 12, display: "flex", gap: 16, flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>
                Cuenta <strong style={{ color: "var(--color-text-secondary)", fontWeight: 500 }}>{data.cuenta?.numeroCuenta}</strong>
              </span>
              <span style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>
                Apertura <strong style={{ color: "var(--color-text-secondary)", fontWeight: 500 }}>{formatDate(data.cuenta?.fechaApertura)}</strong>
              </span>
              <span style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>
                Estatus <strong style={{ color: "#27500A", fontWeight: 500 }}>{data.cuenta?.estatus}</strong>
              </span>
              <span style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>
                CURP <strong style={{ color: "var(--color-text-secondary)", fontWeight: 500, fontFamily: "monospace" }}>{data.cliente?.curp}</strong>
              </span>
            </div>
          </div>

          {/* Transactions */}
          {data.transacciones?.length > 0 && (
            <div style={{
              background: "var(--color-background-primary)",
              border: "0.5px solid var(--color-border-tertiary)",
              borderRadius: 12, padding: "1.25rem"
            }}>
              <h3 style={{ margin: "0 0 4px", fontSize: 14, fontWeight: 500, color: "var(--color-text-primary)" }}>
                Movimientos recientes
              </h3>
              <p style={{ margin: "0 0 14px", fontSize: 12, color: "var(--color-text-tertiary)" }}>
                {data.transacciones.length} transacciones registradas
              </p>
              <div>
                {data.transacciones.map((tx, i) => (
                  <TransactionRow key={i} tx={tx} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {!data && !error && !loading && (
        <div style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--color-text-tertiary)", fontSize: 13 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🏦</div>
          Ingresa un número de cuenta para consultar saldo y movimientos
        </div>
      )}
    </div>
  );
}