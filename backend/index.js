import express from "express";
import cors from "cors";
import path from "node:path";
import fs from "node:fs";
import passport from "passport";
import { Strategy } from "passport-local";

const __dirname = import.meta.dirname;

const app = express();

// cors is painful
app.use(
  cors({
    origin: "http://localhost:5173", // frontend origin
    credentials: true,
  })
);

app.use(express.json());

app.get("/api/questions", (req, res) => {
  const set = req.query.set || "default";
  const filePath = path.join(__dirname, "data", `${set}.json`);

  // TODO: this is definitely vulnerable to path traversal attacks
  // TODO: ensure that the file exists and is a valid JSON file

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read questions" });
    }
    res.json(JSON.parse(data));
  });
});

app.post("/api/auth/login", (req, res) => {
  // Simulate a login response
  const { email } = req.body;
  if (email) {
    res.json({ message: `Welcome back, ${email}!` });
  } else {
    res.status(400).json({ error: "Email is required" });
  }
});

app.post("/api/auth/register", (req, res) => {
  // Simulate a registration response
  const { email } = req.body;
  if (email) {
    res.json({ message: `User ${email} registered successfully!` });
  } else {
    res.status(400).json({ error: "Email is required" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
