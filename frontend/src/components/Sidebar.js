import { Link } from "react-router-dom";

function Sidebar() {
  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    padding: "8px 0"
  };

  return (
    <div
      style={{
        width: "220px",
        background: "#0b1a2f",
        height: "100vh",
        padding: "20px"
      }}
    >
      <h2>🛡️ SIEM</h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Link style={linkStyle} to="/">📊 Dashboard</Link>
        <Link style={linkStyle} to="/alerts">🚨 Alerts</Link>
        <Link style={linkStyle} to="/threat-map">🌍 Threat Map</Link>
        <Link style={linkStyle} to="/login">🔐 Login</Link>
      </nav>
    </div>
  );
}

<button
  onClick={() => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }}
  style={{
    marginTop: "20px",
    padding: "10px",
    background: "red",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }}
>
  🔓 Logout
</button>

export default Sidebar;