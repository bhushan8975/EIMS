import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); // login | register | forgot
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    username: "",
    password: "",
    email: ""
  });

  const BASE_URL = "https://eims-backend.onrender.com";

  const handleSubmit = async () => {
    try {
      setError("");
      setLoading(true);

      if (mode === "login") {
        const res = await axios.post(`${BASE_URL}/login`, form);
        localStorage.setItem("token", res.data.token);
        navigate("/");
      }

      if (mode === "register") {
        await axios.post(`${BASE_URL}/register`, form);
        setMode("login");
        setError("Account created ✅ Please login");
      }

      if (mode === "forgot") {
        await axios.post(`${BASE_URL}/forgot-password`, form);
        setError("Reset link sent (demo) 📩");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* LEFT SIDE */}
      <div style={styles.left}>
        <h1 style={styles.logo}>⚡ EIMS</h1>
        <p style={styles.tagline}>
          Enterprise Intelligence Monitoring System
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div style={styles.right}>
        <div style={styles.card}>

          <h2 style={styles.title}>
            {mode === "login" && "Welcome Back 👋"}
            {mode === "register" && "Create Account 🚀"}
            {mode === "forgot" && "Reset Password 🔐"}
          </h2>

          {error && <p style={styles.error}>{error}</p>}

          {/* EMAIL (register/forgot) */}
          {(mode !== "login") && (
            <input
              placeholder="Email"
              style={styles.input}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          )}

          {/* USERNAME */}
          {mode !== "forgot" && (
            <input
              placeholder="Username"
              style={styles.input}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
            />
          )}

          {/* PASSWORD */}
          {mode !== "forgot" && (
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                style={styles.input}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
              <span
                style={styles.eye}
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? "🙈" : "👁"}
              </span>
            </div>
          )}

          <button
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1
            }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Processing..." : "Continue"}
          </button>

          {/* SWITCH LINKS */}
          <div style={styles.links}>
            {mode === "login" && (
              <>
                <span onClick={() => setMode("register")}>
                  Create account
                </span>
                <span onClick={() => setMode("forgot")}>
                  Forgot password?
                </span>
              </>
            )}

            {mode !== "login" && (
              <span onClick={() => setMode("login")}>
                Back to login
              </span>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    background: "linear-gradient(135deg, #020617, #0f172a)"
  },

  left: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff"
  },

  logo: {
    fontSize: "55px",
    fontWeight: "bold",
    background: "linear-gradient(90deg, #00f5ff, #22c55e)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  },

  tagline: {
    marginTop: "10px",
    color: "#94a3b8"
  },

  right: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  card: {
    width: "340px",
    padding: "40px",
    borderRadius: "15px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(15px)",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 0 60px rgba(0,255,255,0.08)",
    color: "#fff"
  },

  title: {
    marginBottom: "20px"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #334155",
    background: "#020617",
    color: "#fff",
    outline: "none"
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(90deg, #22c55e, #4ade80)",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s"
  },

  links: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px",
    color: "#38bdf8",
    cursor: "pointer"
  },

  error: {
    color: "#ff4d4f",
    marginBottom: "10px"
  },

  eye: {
    position: "absolute",
    right: "10px",
    top: "12px",
    cursor: "pointer"
  }
};