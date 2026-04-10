import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import { io } from "socket.io-client";
import { api, BASE_URL } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

Chart.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const socket = io(BASE_URL, {
  transports: ["websocket"],
});

export default function Dashboard() {
  const [alerts, setAlerts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAlerts();

    socket.on("connect", () => {
      console.log("✅ Connected to backend socket");
    });

    socket.on("newAlert", (data) => {
      toast.info("🚨 New Threat Detected!");
      setAlerts(data);
    });

    return () => socket.disconnect();
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await api.get("/alerts");
      setAlerts(res.data);
    } catch (err) {
      toast.error("Failed to load alerts ❌");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    toast.info("Logged out 👋");
    navigate("/login");
  };

  const count = (type) =>
    alerts.filter((a) => a.severity === type).length;

  const data = {
    labels: ["High", "Medium", "Low"],
    datasets: [
      {
        data: [count("high"), count("medium"), count("low")],
        backgroundColor: ["#ff4d4f", "#faad14", "#52c41a"],
      },
    ],
  };

  const barData = {
    labels: ["High", "Medium", "Low"],
    datasets: [
      {
        label: "Threat Count",
        data: [count("high"), count("medium"), count("low")],
        backgroundColor: ["#ff4d4f", "#faad14", "#52c41a"],
      },
    ],
  };

  return (
    <div style={{ padding: "20px", color: "#fff" }}>

      {/* LOGOUT */}
      <button
        onClick={logout}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          padding: "10px",
          background: "#ff4d4f",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Logout
      </button>

      <h1 style={{ fontSize: "28px" }}>📊 Dashboard</h1>

      {/* CARDS */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        {["total", "high", "medium", "low"].map((type) => (
          <div
            key={type}
            style={{
              flex: 1,
              background: "#1a1a1a",
              padding: "20px",
              borderRadius: "10px"
            }}
          >
            <h3>{type.toUpperCase()}</h3>
            <h2>
              {type === "total" ? alerts.length : count(type)}
            </h2>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div style={{ display: "flex", marginTop: "40px", gap: "40px" }}>
        <div style={{ width: "300px" }}>
          <Pie data={data} />
        </div>

        <div style={{ width: "400px" }}>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
}