// import library express js
const express = require('express');
const app = express(); // call function express
const port = 3000; // define port varaibel
const pengirimanRouter = require('./Routes/pengirimanRoutes.js');

// import bodyparser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// import database
const db = require('./config/Database.js');
const { createpengiriman } = require('./Models/pengiriman.js');

app.use(pengirimanRouter); 

//create logger middleware
function loggerMiddleware(req, res, next) {
    console.log(`reques received at ${new Date()}`);
    next();//continue process to next function
}

// Endpoint untuk mengambil data berdasarkan nomor resi
app.get('/api/cek-resi/:no_resi', async (req, res) => {
    const no_resi = req.params.no_resi;
    try {
      const item = await getItemByNoResi(no_resi);
      if (!item) {
        res.status(404).json({ error: 'Data tidak ditemukan' });
      } else {
        res.json(item);
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data' });
    }
  });
  
  // Fungsi untuk mengambil data berdasarkan nomor resi dari database
  const getItemByNoResi = (no_resi) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM pengiriman WHERE no_resi = ?', [no_resi], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length === 0) {
            resolve(null); // Data tidak ditemukan
          } else {
            resolve(results[0]); // Mengembalikan data pertama yang cocok
          }
        }
      });
    });
  };

app.post('/api/pengiriman', async (req, res) => {
    try {
      const { no_resi,layanan, asal, tujuan,pengirim, penerima,tanggal } = req.body;
      const newItem = { no_resi,layanan, asal, tujuan,pengirim, penerima,tanggal };
      await createpengiriman(newItem);
      res.status(201).json({ message: 'Item telah ditambahkan' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Terjadi kesalahan saat menambahkan item' });
    }
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});