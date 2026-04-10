import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Alerts from "./pages/Alerts";
import ThreatMap from "./pages/ThreatMap";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <div style={{ background: "#111", color: "#fff", minHeight: "100vh", padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/threat-map" element={<ThreatMap />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;