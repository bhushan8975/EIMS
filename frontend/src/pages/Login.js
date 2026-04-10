import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
    email: ""
  });

  const BASE_URL = "https://eims-backend.onrender.com";

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (mode === "login") {
        const res = await axios.post(`${BASE_URL}/login`, form);

        localStorage.setItem("token", res.data.token);

        toast.success("Login successful 🚀");
        navigate("/");
      }

      if (mode === "register") {
        await axios.post(`${BASE_URL}/register`, form);
        toast.success("Account created 🎉");
        setMode("login");
      }

      if (mode === "forgot") {
        await axios.post(`${BASE_URL}/forgot-password`, form);
        toast.info("Reset link sent 📩");
      }

    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong ❌");
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

          {(mode !== "login") && (
            <input
              placeholder="Email"
              style={styles.input}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          )}

          {mode !== "forgot" && (
            <input
              placeholder="Username"
              style={styles.input}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
            />
          )}

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
    background: "radial-gradient(circle at 20% 20%, #0ea5e9, #020617)"
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
    color: "#fff"
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(90deg, #22c55e, #4ade80)",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer"
  },

  links: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px",
    color: "#38bdf8",
    cursor: "pointer"
  },

  eye: {
    position: "absolute",
    right: "10px",
    top: "12px",
    cursor: "pointer"
  }
};