import { useEffect, useState } from "react";
import io from "socket.io-client";

function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("alert", (data) => {
      setAlerts((prev) => [data, ...prev.slice(0, 19)]);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <h1>🚨 Alerts Panel</h1>

      {alerts.map((a, i) => (
        <div
          key={i}
          style={{
            margin: "15px 0",
            padding: "15px",
            border: "1px solid red",
            borderRadius: "8px",
            background: "#1a1a1a",

            // 🔥 BONUS GLOW EFFECT
            boxShadow: "0 0 10px rgba(255,0,0,0.5)"
          }}
        >
          <p style={{ fontWeight: "bold" }}>{a.message}</p>
          <small style={{ color: "#aaa" }}>{a.time}</small>
        </div>
      ))}
    </div>
  );
}

export default Alerts;