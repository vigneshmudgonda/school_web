const express = require("express");
const cors = require("cors");
const multer = require("multer");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve images

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Test API
app.get("/", (req, res) => {
  res.send("Backend running...");
});

// Add School API
app.post("/schools", upload.single("image"), (req, res) => {
  const { name, address, city, state, contact, email_id } = req.body;
  const image = req.file ? req.file.filename : null;

  const sql = "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [name, address, city, state, contact, image, email_id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "School added successfully!" });
  });
});

// Fetch Schools API
app.get("/schools", (req, res) => {
  db.query("SELECT * FROM schools", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
