const Sequelize = require("sequelize");
const db = new Sequelize("railway", "root", "xmS64xgt6weupB7DT7yn", {
  host: "containers-us-west-88.railway.app",
  dialect: "mysql",
  port:"5797",

});

db.authenticate()
  .then(() => {
    console.log('Connected to MySQL');
  })
  .catch((err) => {
    console.error('Error connecting to MySQL:', err);
  });

module.exports = db;
