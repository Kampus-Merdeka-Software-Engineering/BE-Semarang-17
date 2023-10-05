// import library express js
const express = require('express');
const app = express(); // call function express
const pengirimanRouter = require('./Routes/pengirimanRoutes.js');
const cors = require('cors');

// import bodyparser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(cors());

// import database
const db = require('./config/Database.js');
const { createpengiriman, Pengiriman } = require('./Models/pengiriman.js');

app.use(pengirimanRouter); 

//create logger middleware
function loggerMiddleware(req, res, next) {
    console.log(`reques received at ${new Date()}`);
    next();//continue process to next function
}

// GET data terakhir di post
app.get('/api/pengirimans/terakhir', async (req, res) => {
  try {
    const latestItem = await getLatestPengiriman();
    if (!latestItem) {
      res.status(404).json({ error: 'Data tidak ditemukan' });
    } else {
      res.json(latestItem);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data' });
  }
});

// Function to get the latest Pengiriman
const getLatestPengiriman = async () => {
  try {
    const latestItem = await Pengiriman.findOne({
      order: [['createdAt', 'DESC']],
    });
    return latestItem;
  } catch (error) {
    throw error;
  }
};

// GET berdasrkan no_resi
app.get('/api/cek-resi/:no_resi', async (req, res) => {
  try {
    const no_resi = req.params.no_resi;
    const item = await getPengirimanByNoResi(no_resi);
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

// Function to get a Pengiriman by id using findOne
const getPengirimanByNoResi = async (no_resi) => {
  try {
    const item = await Pengiriman.findOne({
      where: { no_resi: no_resi },
    });
    return item;
  } catch (error) {
    throw error;
  }
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