const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();
const db = require("./db"); // MySQL connection

const app = express();
app.use(cors());
app.use(express.json());

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Multer + Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "schools",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});
const upload = multer({ storage });

// Test route
app.get("/", (req, res) => res.send("✅ Backend running..."));

// Add School API
app.post("/schools", upload.single("image"), (req, res) => {
  console.log("=== BODY ===", req.body);
  console.log("=== FILE ===", req.file);

  res.json({ body: req.body, file: req.file });
});


// Fetch Schools API
// Fetch schools
app.get("/schools", (req, res) => {
  db.query("SELECT * FROM schools", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
