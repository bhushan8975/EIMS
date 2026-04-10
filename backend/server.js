require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
const server = http.createServer(app);

// 🔥 FIX FOR RENDER
app.set("trust proxy", 1);

// ⚡ SOCKET.IO
const io = require("socket.io")(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

/* =========================
   ✅ HEALTH CHECK (FAST RESPONSE)
========================= */
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

/* =========================
   🔐 DEMO USER
========================= */
const user = {
  username: "bhushan",
  password: bcrypt.hashSync("123456", 8)
};

/* =========================
   🔐 LOGIN ROUTE
========================= */
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username !== user.username) {
    return res.status(401).send("User not found");
  }

  const validPassword = bcrypt.compareSync(password, user.password);

  if (!validPassword) {
    return res.status(401).send("Invalid password");
  }

  const token = jwt.sign({ username }, "secretkey", {
    expiresIn: "1h"
  });

  res.json({ token });
});

/* =========================
   🌐 ROOT ROUTE
========================= */
app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "EIMS Backend Running 🚀",
    time: new Date()
  });
});

/* =========================
   ⚡ SOCKET EVENTS
========================= */
io.on("connection", (socket) => {
  console.log("Client connected");

  const alertInterval = setInterval(() => {
    socket.emit("alert", {
      message: "⚠️ Suspicious Activity Detected",
      time: new Date().toLocaleTimeString()
    });
  }, 5000);

  socket.on("disconnect", () => {
    clearInterval(alertInterval);
  });
});

/* =========================
   🔥 KEEP ALIVE (IMPORTANT FOR RENDER)
========================= */
setInterval(() => {
  console.log("Server alive");
}, 10000);

/* =========================
   ❗ ERROR HANDLING
========================= */
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

/* =========================
   🚀 START SERVER
========================= */
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("Server running on " + PORT);
});