const mongoose = require('mongoose')

const countrySchema = new mongoose.Schema ({
    name: { 
        type: String, 
        required: true 
    },
    quests: [{ 
               type: mongoose.Schema.Types.ObjectId, 
               ref: 'Quest' 
           }],
})

module.exports = mongoose.model('Country', countrySchema)