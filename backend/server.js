require("dotenv").config();
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

// 🔐 DEMO USER (you can later move to DB)
const user = {
  username: "bhushan",
  password: bcrypt.hashSync("123456", 8) // password = 123456
};

// 🔐 LOGIN ROUTE
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

// 🌐 TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// ⚡ SOCKET
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

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("Server running on " + PORT);
});