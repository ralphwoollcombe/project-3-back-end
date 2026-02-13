const express = require('express');
const router = express.Router();

const Quest = require('../models/quest');
const Country = require('../models/country')
const verifyToken = require('../middleware/verify-token');

router.get('/', verifyToken, async (req, res) => {
    try {
        const allCountries = await Country.find({})
        // const countries = allCountries.filter(country => 
        //     country.quests.length > 0
        // )
    res.status(200).json(allCountries)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.get('/:countryId', verifyToken, async (req, res) => {
    try {
        const country = await Country.findById(req.params.countryId)
        .populate('quests')
        res.status(200).json(country)
    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error.message });
    }
})

module.exports = router
