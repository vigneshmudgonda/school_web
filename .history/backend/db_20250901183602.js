const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",      // change to your MySQL username
  password: "",      // your MySQL password
  database: "school_directory"
});

db.connect(err => {
  if (err) {
    console.error("MySQL connection failed:", err);
    return;
  }
  console.log("✅ MySQL Connected!");
});

module.exports = db;
