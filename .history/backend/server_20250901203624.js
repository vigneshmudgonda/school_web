const express = require("express");
const cors = require("cors");
const multer = require("multer");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve uploaded images
app.use("/uploads", express.static("uploads"));

// ✅ Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// ✅ Test API
app.get("/", (req, res) => {
  res.send("✅ Backend running...");
});

// ✅ Add School API
app.post("/schools", upload.single("image"), (req, res) => {
  const { name, address, city, state, contact, email_id } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!name || !address || !city || !state || !contact || !email_id) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  const sql =
    "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [name, address, city, state, contact, image, email_id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "✅ School added successfully!", id: result.insertId });
  });
});

// ✅ Fetch Schools API
app.get("/schools", (req, res) => {
  const sql = "SELECT * FROM schools";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });

    // Add full URL for image
    const updatedResults = results.map((s) => ({
      ...s,
      image: s.image ? `http://localhost:5000/uploads/${s.image}` : null,
    }));

    res.json(updatedResults);
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
