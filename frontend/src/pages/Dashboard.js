// 📍 frontend/src/pages/Dashboard.js

import { useEffect, useState } from "react";
import io from "socket.io-client";
import PieChart from "../components/PieChart";

const socket = io("http://localhost:5000");

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    high: 0,
    medium: 0,
    low: 0
  });

  const [pulse, setPulse] = useState(false); // 🔥 NEW

  useEffect(() => {
    socket.on("attack", (data) => {
      setPulse(true); // trigger animation

      setTimeout(() => setPulse(false), 500); // reset animation

      setStats((prev) => {
        const updated = { ...prev, total: prev.total + 1 };

        if (data.severity === "High") updated.high++;
        if (data.severity === "Medium") updated.medium++;
        if (data.severity === "Low") updated.low++;

        return updated;
      });
    });

    return () => socket.off("attack");
  }, []);

  return (
    <div>
      <h1>📊 Dashboard</h1>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <Card title="Total" value={stats.total} color="#00bcd4" pulse={pulse} />
        <Card title="High" value={stats.high} color="red" pulse={pulse} />
        <Card title="Medium" value={stats.medium} color="orange" pulse={pulse} />
        <Card title="Low" value={stats.low} color="green" pulse={pulse} />
      </div>

      <div
        style={{
          width: "400px",
          height: "300px",
          marginTop: "30px",
          background: "#1a1a1a",
          padding: "20px",
          borderRadius: "10px"
        }}
      >
        <PieChart stats={stats} />
      </div>
    </div>
  );
}

function Card({ title, value, color, pulse }) {
  return (
    <div
      style={{
        padding: "20px",
        background: "#1a1a1a",
        borderRadius: "10px",
        flex: 1,
        borderLeft: `5px solid ${color}`,
        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
        animation: pulse ? "pulse 0.5s" : "none" // 🔥 ANIMATION
      }}
    >
      <h3>{title}</h3>
      <h2>{value}</h2>
    </div>
  );
}

export default Dashboard;