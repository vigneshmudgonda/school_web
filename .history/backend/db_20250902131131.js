const mysql = require("mysql2");

const db = mysql.createPool({
  host: "gateway01.ap-southeast-1.prod.aws.tidbcloud.com",
  user: "amn3gjJF27492x9.root",
  password: "bmd5ujpGkoV1AvqG",
  database: "test",
  port: 4000,
  ssl: {
    rejectUnauthorized: true,
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.getConnection((err, conn) => {
  if (err) {
    console.error("❌ TiDB Connection failed:", err);
  } else {
    console.log("✅ TiDB Connected!");
    conn.release();
  }
});

module.exports = db;
