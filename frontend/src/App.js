```javascript
import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Alerts from "./pages/Alerts";
import ThreatMap from "./pages/ThreatMap";
import Login from "./pages/Login";

function Layout() {
  const location = useLocation();

  // Hide sidebar on login page
  const hideSidebar = location.pathname === "/login";

  return (
    <div style={{ display: "flex", background: "#111", color: "#fff", minHeight: "100vh" }}>
      
      {!hideSidebar && <Sidebar />}

      <div style={{ flex: 1, padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/threat-map" element={<ThreatMap />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
```
