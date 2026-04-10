import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api"; // ✅ use central API

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setError("");
      setLoading(true);

      // ✅ FIXED (uses deployed backend)
      const res = await api.post("/login", form);

      localStorage.setItem("token", res.data.token);

      navigate("/");
    } catch (err) {
      setError("Invalid credentials ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0d1117"
      }}
    >
      <div
        style={{
          padding: "40px",
          background: "#161b22",
          borderRadius: "10px",
          width: "300px",
          boxShadow: "0 0 25px rgba(0,0,0,0.6)"
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>🔐 Login</h2>

        {error && (
          <p
            style={{
              color: "#ff4d4f",
              marginBottom: "10px",
              textShadow: "0 0 8px rgba(255,0,0,0.7)"
            }}
          >
            {error}
          </p>
        )}

        <input
          placeholder="Username"
          style={inputStyle}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          style={inputStyle}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          style={{
            ...btnStyle,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? "not-allowed" : "pointer"
          }}
          onClick={login}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  background: "#0d1117",
  border: "1px solid #30363d",
  color: "#fff",
  borderRadius: "5px"
};

const btnStyle = {
  width: "100%",
  padding: "10px",
  background: "#238636",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  transition: "0.3s ease"
};

export default Login;