const express = require('express');
const router = express.Router({mergeParams: true});

const Quest = require('../models/quest');
const Country = require('../models/country')
const verifyToken = require('../middleware/verify-token');


router.get('/', verifyToken, async (req, res) => {
    try {
        const quests = await Quest.find({author: req.params.userId})
        .populate('author').populate('country')
        res.status(200).json(quests)
    } catch (error) {
        console.log(error)
        res.status(500).json({ err: err.message });
    }
})

router.get('/:questId', verifyToken, async (req, res) => {
    try {
        const quest = await Quest.findById(req.params.questId)
        .populate('author').populate('country')
        res.status(200).json(quest)
    } catch (error) {
        console.log(error)
        res.status(500).json({ err: err.message });         
    }
})

router.post('/', verifyToken, async (req, res) => {
    try {
        const questCountry = Country.findOne({name: req.body.country})
        req.body.country = questCountry._id
        req.body.author = req.user._id
        const quest = await Quest.create(req.body)
        questCountry.quests.push(quest._id)
        await questCountry.save();
        res.status(201).json(quest)
    } catch (error) {
        res.status(400).json({ err: err.message });         
    }
})

router.delete('/:questId', verifyToken, async (req, res) => {
    try {
        const quest = await Quest.findById(req.params.questId);
        if (!quest.author.equals(req.user._id)) {
            return res.status(403).send("You cannot delete this quest!")
        }
            const deleteQuest = await quest.deleteOne();
            res.status(200).json(deleteQuest);
    } catch (error) {
        res.status(500).json({ err: error.message })
    };
});

router.put(':questId', verifyToken, async (req, res) => {
    try {
        const quest = await Quest.findById(req.params.questId);
        if (!quest.author.equals(req.user._id)) {
            return res.status(403).send("You're cannot edit this quest!")
        }
        const updateQuest = await Quest.findByIdAndUpdate(req.params.questId);
        res.status(200).json(updateQuest);
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
})

module.exports = router