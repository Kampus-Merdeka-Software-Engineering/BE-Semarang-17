const Sequelize = require("sequelize");
const db = new Sequelize(process.env.MYSQLDATABASE, process.env.MYSQLUSER, process.env.MYSQLPASSWORD, {
  host: process.env.MYSQLHOST,
  dialect: "mysql",
  port:process.env.MYSQLPORT,

});

db.authenticate()
  .then(() => {
    console.log('Connected to MySQL');
  })
  .catch((err) => {
    console.error('Error connecting to MySQL:', err);
  });

module.exports = db;
