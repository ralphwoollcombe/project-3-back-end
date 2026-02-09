const express = require('express');
const router = express.Router();
const Country = require('../models/country')

const seedCountries = async () => {
    const allCountries = await Country.find({});
    if (allCountries.length === 0) {
        try {
        const res = await fetch('https://countriesnow.space/api/v0.1/countries/')
        if (!res.ok) throw new Error('Something went wrong')
        const dataJson = await res.json()
        const fullData = dataJson.data
        const data = fullData.map(country => {
            return country.country
        })
        await data.forEach(country => {
            Country.create({name: country})
        })
        return data
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = seedCountries