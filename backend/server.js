const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Basic route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// ✅ Example alerts API
app.get("/alerts", (req, res) => {
  res.json([
    { severity: "high" },
    { severity: "medium" },
    { severity: "low" },
  ]);
});

const server = http.createServer(app);

// ✅ Socket setup
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.emit("newAlert", [
    { severity: "high" },
    { severity: "low" },
  ]);
});

// 🔥 VERY IMPORTANT (Render PORT)
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});