import express from "express";
import cors from "cors";
import path from "node:path";
import fs from "node:fs";
const __dirname = import.meta.dirname;


const app = express();
app.use(cors());

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


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
