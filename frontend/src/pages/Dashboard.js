import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { io } from "socket.io-client";

const SOCKET_URL = "https://eims-backend.onrender.com";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    high: 0,
    medium: 0,
    low: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();

    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("✅ Socket connected");
    });

    socket.on("newAlert", (data) => {
      processData(data);
    });

    return () => socket.disconnect();
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await api.get("/alerts");
      processData(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error:", err);
      setLoading(false);
    }
  };

  const processData = (data) => {
    const counts = {
      total: data.length,
      high: 0,
      medium: 0,
      low: 0,
    };

    data.forEach((item) => {
      if (item.severity === "high") counts.high++;
      else if (item.severity === "medium") counts.medium++;
      else counts.low++;
    });

    setStats(counts);
  };

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>📊 Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div style={styles.grid}>
            <Card title="Total" value={stats.total} color="#00d4ff" />
            <Card title="High" value={stats.high} color="#ff3b3b" />
            <Card title="Medium" value={stats.medium} color="#ffaa00" />
            <Card title="Low" value={stats.low} color="#00c853" />
          </div>

          <div style={styles.chartBox}>
            <h3>Threat Distribution</h3>
            <div style={styles.legend}>
              <span style={{ color: "#ff3b3b" }}>■ High</span>
              <span style={{ color: "#ffaa00" }}>■ Medium</span>
              <span style={{ color: "#00c853" }}>■ Low</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div style={{ ...styles.card, borderLeft: `5px solid ${color}` }}>
      <h3>{title}</h3>
      <p style={{ fontSize: "24px" }}>{value}</p>
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#1c1c1c",
    padding: "20px",
    borderRadius: "10px",
    color: "#fff",
  },
  chartBox: {
    marginTop: "30px",
    background: "#1c1c1c",
    padding: "20px",
    borderRadius: "10px",
    color: "#fff",
  },
  legend: {
    display: "flex",
    gap: "20px",
  },
};

export default Dashboard;