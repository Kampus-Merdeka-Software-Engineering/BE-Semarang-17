// import library express js
const express = require('express');
const app = express(); // call function express
const port = 3000; // define port varaibel

// import bodyparser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//create logger middleware
function loggerMiddleware(req, res, next) {
    console.log(`reques received at ${new Date()}`);
    next();//continue process to next function
}

// create http method get for customers
app.get('/api/cek-resi',loggerMiddleware, (req, res) => {
    res.json({
        massage: 'berhasil get data',
        data: 
        [
        {
            no_resi: 2909202301,
            layanan : "gercep",
            asal: "bali",
            tujuan: "jakarta",
            pengirim: "angga",
            penerima: "budi",
            tanggal_pengiriman: new Date("2023-09-26")

        }
        ]
    })
});

//create handling http post for api customers
app.post('/api/pengiriman/:no_resi',loggerMiddleware, (req, res) => {
    const { no_resi,layanan, asal, tujuan,pengirim, penerima,tanggal } = req.body;
    //res.send(`layanan anda adalah ${layanan} asal anda adalah ${asal} dan tujuan anda adalah ${tujuan}, nama pengirim atas nama ${pengirim}, dan penerima atas nama ${penerima}, dan tanggal kirim adalah ${tanggal}`)
    res.json({
        massaged: "create data pengiriman success",
        data :
        {
            no_resi: no_resi,
            layanan : layanan,
            asal: asal,
            tujuan: tujuan,
            pengirim: pengirim,
            penerima: penerima,
            tanggal: tanggal
        }
    })
});

// handling post 
// app.post('/api/pengiriman',loggerMiddleware, (req, res) => {
//     const { layanan, asal, tujuan, pengirim, penerima, tanggal } = req.body;
//     const responseText = `layanan anda adalah ${layanan} asal anda adalah ${asal} dan tujuan anda adalah ${tujuan}, nama pengirim atas nama ${pengirim}, dan penerima atas nama ${penerima}, dan tanggal kirim adalah ${tanggal}`;
//     res.send(responseText);
// });

// app listening on port 3000
app.listen(3000, () => {
    console.log(`app is listening on ${port}`);
});