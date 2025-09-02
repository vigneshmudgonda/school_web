const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "gateway01.ap-southeast-1.prod.aws.tidbcloud.com",
  user: "amn3gjJF27492x9.root",      // change to your MySQL username
  password: "bmd5ujpGkoV1AvqG",      // your MySQL password
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
