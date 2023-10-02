const Sequelize = require('sequelize'); // import sequence
// const datatypes = require('datatypes'); // import datatype
const db = require('../config/Database.js'); // import db

//create data pengiriman
const createpengiriman = (item) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO pengiriman (no_resi, layanan, asal, tujuan, pengirim, penerima, tanggal) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [item.no_resi, item.layanan, item.asal, item.tujuan, item.pengirim, item.penerima, item.tanggal],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
    });
  };
  
module.exports = { createpengiriman };
