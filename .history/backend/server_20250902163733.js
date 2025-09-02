const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();
const db = require("./db"); // MySQL connection
const upload = multer({ storage });


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


// Test route
app.get("/", (req, res) => res.send("✅ Backend running..."));

// Add School API
app.post("/schools", upload.single("image"), (req, res) => {
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);


  console.log("Result:", result); // prints object nicely in Node
console.log("Result JSON:", JSON.stringify(result, null, 2)); // pretty print


  const { name, address, city, state, contact, email_id } = req.body;
  const image = req.file?.path || null;

  if (!name || !address || !city || !state || !contact || !email_id || !image) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  const sql =
    "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [name, address, city, state, contact, image, email_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "School added successfully!", id: result.insertId });
  });
});



// Fetch Schools API
app.get("/schools", (req, res) => {
  const sql = "SELECT * FROM schools";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    // Results already contain Cloudinary URLs
    res.json(results);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
