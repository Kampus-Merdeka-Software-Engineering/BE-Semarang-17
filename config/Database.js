const Sequelize = require("sequelize");
const db = new Sequelize("railway", "root", "WtEj6J2UFTach98pItw1", {
  host: "containers-us-west-187.railway.app",
  dialect: "mysql",
  port:"6734",

});

db.authenticate()
  .then(() => {
    console.log('Connected to MySQL');
  })
  .catch((err) => {
    console.error('Error connecting to MySQL:', err);
  });

module.exports = db;
