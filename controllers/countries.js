const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verify-token');
const Country = require('../models/country');


router.get('/', verifyToken, async (req, res) => {
    try {
        const countries = await Country.find({});
        res.json(countries);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});




module.exports = router;
