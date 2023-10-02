const express = require('express');
const router = express.Router();
const pengirman = require('../Models/pengiriman.js');

router.post('./Models/pengirman', async (req, res) => {
    try {
        await pengirman.create(req.body);
        res.status(201).json({ msg: 'pengirman created successfully' });
    } catch (error) {
        res.send(error.message);
    }
});
router.get('./Models/pengiriman', async (req, res) => {
    try {
        const SQLquery = 'select * from pengiriman';
        res.status(200).json({msg: 'select successfully'})
    } catch (error) {
        res.send(error.message);
    }
});   

module.exports = router;
