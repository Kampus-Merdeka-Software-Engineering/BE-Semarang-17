const Sequelize = require("sequelize");
const db = new Sequelize("si-gercep", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

db.authenticate()
  .then(() => {
    console.log('Connected to MySQL');
  })
  .catch((err) => {
    console.error('Error connecting to MySQL:', err);
  });

module.exports = db;
