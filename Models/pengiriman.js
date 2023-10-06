const Sequelize = require('sequelize');
const db = require('../config/Database.js');

const Pengiriman = db.define('pengirimans', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  no_resi: {
    type: Sequelize.STRING,
    unique: true, // Pastikan nomor resi unik
  },
  layanan: Sequelize.STRING,
  asal: Sequelize.STRING,
  tujuan: Sequelize.STRING,
  pengirim: Sequelize.STRING,
  penerima: Sequelize.STRING,
  tanggal: Sequelize.STRING,
});

// Sync the model with the database (assuming 'db' is your Sequelize instance)
db.sync();

const createpengiriman = async (item) => {
  // Generate nomor resi unik (contoh: menggunakan timestamp)
  const timestamp = Date.now();
  const no_resi = `${timestamp}`;

  try {
    // Cek apakah nomor resi sudah ada dalam database, jika iya, generate ulang
    const existingPengiriman = await Pengiriman.findOne({
      where: {
        no_resi,
      },
    });
    
    if (existingPengiriman) {
      // Generate nomor resi ulang jika sudah ada
      return createpengiriman(item);
    }
    
    // Jika nomor resi unik, simpan pengiriman ke database
    const createdItem = await Pengiriman.create({
      ...item,
      no_resi,
    });
    
    return createdItem.toJSON();
  } catch (error) {
    throw error;
  }
};

module.exports = { createpengiriman, Pengiriman };