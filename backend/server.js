require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

/* ================= DATABASE ================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log("Mongo Error ❌", err));

/* ================= MODELS ================= */

// USER MODEL
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const User = mongoose.model("User", UserSchema);

// ALERT MODEL
const AlertSchema = new mongoose.Schema({
  severity: String,
  createdAt: { type: Date, default: Date.now }
});

const Alert = mongoose.model("Alert", AlertSchema);

/* ================= AUTH ================= */
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: "No token ❌" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ message: "Invalid token ❌" });
  }
};

/* ================= ROUTES ================= */

// REGISTER
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashed
  });

  res.json({ message: "User created ✅" });
});

// LOGIN
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) return res.status(401).json({ message: "User not found ❌" });

  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.status(401).json({ message: "Wrong password ❌" });

  const token = jwt.sign({ user: user.username }, process.env.JWT_SECRET, {
    expiresIn: "1h"
  });

  res.json({ token });
});

// FORGOT PASSWORD (demo)
app.post("/forgot-password", (req, res) => {
  res.json({ message: "Reset link sent (demo) 📩" });
});

// GET ALERTS
app.get("/alerts", verifyToken, async (req, res) => {
  const data = await Alert.find().sort({ createdAt: -1 });
  res.json(data);
});

// CREATE ALERT
app.post("/alerts", verifyToken, async (req, res) => {
  const alert = await Alert.create(req.body);
  io.emit("newAlert", [alert]);
  res.json(alert);
});

/* ================= SERVER ================= */
const server = http.createServer(app);

/* ================= SOCKET ================= */
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", () => {
  console.log("Client connected 🔌");
});

/* ================= START ================= */
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});