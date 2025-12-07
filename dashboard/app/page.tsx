// app/page.tsx

async function getLogs(): Promise<any[]> {
  try {
    const res = await fetch("http://localhost:8080/logs", {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error("Error fetching logs:", e);
    return [];
  }
}

async function getAlerts(): Promise<any[]> {
  try {
    const res = await fetch("http://localhost:8080/logs/alerts", {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error("Error fetching alerts:", e);
    return [];
  }
}

// helper functions for cell colors
function statusColor(status: number) {
  if (status >= 500) return "#f97373"; // red
  if (status >= 400) return "#facc6b"; // yellow
  if (status >= 200) return "#4ade80"; // green
  return "#d4d4d4"; // grey
}

function latencyColor(latency: number) {
  if (latency > 700) return "#f97373"; // very slow
  if (latency > 500) return "#facc6b"; // slow
  return "#4ade80"; // acceptable
}

export default async function Home() {
  const logs = await getLogs();
  const alerts = await getAlerts();

  const slowCount = alerts.filter((a) => a.type === "SLOW").length;
  const errorCount = alerts.filter((a) => a.type === "ERROR").length;
  const rateLimitCount = alerts.filter((a) => a.type === "RATE_LIMIT").length;

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "2rem",
        fontFamily: "system-ui, sans-serif",
        color: "#fff",
        background:
          "radial-gradient(circle at top, #1e293b 0, #020617 45%, #000 100%)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <header style={{ marginBottom: "1.75rem" }}>
          <h1
            style={{
              fontSize: "2.3rem",
              fontWeight: 700,
              marginBottom: "0.4rem",
            }}
          >
            API Monitoring Dashboard
          </h1>
          <p style={{ opacity: 0.8, fontSize: "0.95rem" }}>
            Live view of API logs and alerts from the tracking-client service.
          </p>
        </header>

        {/* Summary Cards */}
        <section
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "2rem",
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "Total Logs", value: logs.length, emoji: "1️⃣" },
            { label: "Slow APIs (> 500ms)", value: slowCount, emoji: "2️⃣" },
            { label: "Broken APIs (5xx)", value: errorCount, emoji: "3️⃣" },
            { label: "Rate-limit Hits", value: rateLimitCount, emoji: "4️⃣" },
          ].map((card) => (
            <div
              key={card.label}
              style={{
                flex: "1 1 230px",
                padding: "1rem 1.1rem",
                borderRadius: "12px",
                border: "1px solid rgba(148,163,184,0.4)",
                background:
                  "linear-gradient(145deg, rgba(15,23,42,0.95), rgba(15,23,42,0.7))",
                boxShadow: "0 10px 25px rgba(0,0,0,0.55)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.35rem",
                }}
              >
                <span style={{ fontSize: "0.85rem", opacity: 0.85 }}>
                  {card.label}
                </span>
                <span style={{ fontSize: "1.1rem" }}>{card.emoji}</span>
              </div>
              <div
                style={{
                  fontSize: "1.9rem",
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                }}
              >
                {card.value}
              </div>
            </div>
          ))}
        </section>

        {/* Logs Table */}
        <section style={{ marginBottom: "2.5rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: "0.75rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.3rem",
                fontWeight: 600,
              }}
            >
              API Logs
            </h2>
            <span style={{ fontSize: "0.8rem", opacity: 0.7 }}>
              Latest {logs.length} events
            </span>
          </div>

          <div
            style={{
              overflowX: "auto",
              borderRadius: "12px",
              border: "1px solid #1f2933",
              backgroundColor: "rgba(15,23,42,0.95)",
              boxShadow: "0 12px 30px rgba(0,0,0,0.6)",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "0.9rem",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#020617", color: "#e5e7eb" }}>
                  {[
                    "Service",
                    "Endpoint",
                    "Method",
                    "Status",
                    "Latency (ms)",
                    "Timestamp",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "0.65rem 0.75rem",
                        borderBottom: "1px solid #111827",
                        textAlign: "left",
                        fontWeight: 500,
                        fontSize: "0.8rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {logs.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      style={{
                        padding: "1rem",
                        textAlign: "center",
                        opacity: 0.8,
                      }}
                    >
                      No logs yet. Trigger some API calls from the
                      tracking-client service.
                    </td>
                  </tr>
                ) : (
                  logs.map((log: any, index: number) => {
                    const stripe =
                      index % 2 === 0 ? "#020617" : "#020617cc";
                    return (
                      <tr
                        key={log.id ?? index}
                        style={{
                          backgroundColor: stripe,
                        }}
                      >
                        <td
                          style={{
                            padding: "0.6rem 0.75rem",
                            borderBottom: "1px solid #111827",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {log.service}
                        </td>
                        <td
                          style={{
                            padding: "0.6rem 0.75rem",
                            borderBottom: "1px solid #111827",
                            fontFamily: "monospace",
                            fontSize: "0.85rem",
                          }}
                        >
                          {log.endpoint}
                        </td>
                        <td
                          style={{
                            padding: "0.6rem 0.75rem",
                            borderBottom: "1px solid #111827",
                            textTransform: "uppercase",
                            fontSize: "0.8rem",
                            opacity: 0.9,
                          }}
                        >
                          {log.method}
                        </td>
                        <td
                          style={{
                            padding: "0.6rem 0.75rem",
                            borderBottom: "1px solid #111827",
                          }}
                        >
                          <span
                            style={{
                              display: "inline-block",
                              padding: "0.15rem 0.5rem",
                              borderRadius: "999px",
                              backgroundColor: "rgba(15,23,42,0.9)",
                              border: "1px solid rgba(148,163,184,0.5)",
                              color: statusColor(log.status),
                              fontSize: "0.8rem",
                              fontWeight: 500,
                            }}
                          >
                            {log.status}
                          </span>
                        </td>
                        <td
                          style={{
                            padding: "0.6rem 0.75rem",
                            borderBottom: "1px solid #111827",
                          }}
                        >
                          <span
                            style={{
                              display: "inline-block",
                              minWidth: "3.2rem",
                              textAlign: "right",
                              color: latencyColor(log.latency),
                              fontVariantNumeric: "tabular-nums",
                            }}
                          >
                            {log.latency}
                          </span>
                        </td>
                        <td
                          style={{
                            padding: "0.6rem 0.75rem",
                            borderBottom: "1px solid #111827",
                            fontSize: "0.8rem",
                            opacity: 0.85,
                          }}
                        >
                          {log.timestamp}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Alerts */}
        <section>
          <h2
            style={{
              fontSize: "1.3rem",
              fontWeight: 600,
              marginBottom: "0.5rem",
            }}
          >
            Alerts
          </h2>

          <ul style={{ paddingLeft: "1rem", fontSize: "0.9rem" }}>
            {alerts.length === 0 ? (
              <li style={{ opacity: 0.8 }}>No alerts 🎉</li>
            ) : (
              alerts.map((a: any) => (
                <li
                  key={a.id}
                  style={{
                    marginBottom: "0.3rem",
                    padding: "0.35rem 0.5rem",
                    borderRadius: "8px",
                    backgroundColor: "#020617",
                    border: "1px solid #1f2937",
                  }}
                >
                  <strong>[{a.type}]</strong> {a.service} {a.endpoint} at{" "}
                  {a.timestamp}
                </li>
              ))
            )}
          </ul>
        </section>
      </div>
    </main>
  );
}
