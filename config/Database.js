const Sequelize = require("sequelize");
const mysql = require("mysql2");
// create database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "si-gercep",
});
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL");
  }
});
module.exports = db;
