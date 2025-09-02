// server.js
import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Multer storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "schools",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const parser = multer({ storage });

// Example POST route
app.post("/schools", parser.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Access other fields
    const { name, address, city, state, contact, email_id } = req.body;

    // Save school data to DB here (MySQL/TiDB)

    res.json({
      message: "School added successfully",
      data: {
        name,
        address,
        city,
        state,
        contact,
        email_id,
        image_url: req.file.path, // Cloudinary URL
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add school" });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
