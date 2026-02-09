const mongoose = require('mongoose')

const questSchema = new mongoose.Schema ({
    general: {
        type: String
    }, 
    food: {
        story: {
            type: String,
            required: true
        },
        review: {
            type: String,
        },
        rating: {
                type: Number,
                enum: [1,2,3,4,5]
            }
    },
     experience: {
        story: {
            type: String,
            required: true
        },
        review: {
            type: String,
        },
        rating: {
                type: Number,
                enum: [1,2,3,4,5]
            }
    },
     transport: {
        story: {
            type: String,
            required: true
        },
        review: {
            type: String,
        },
        rating: {
                type: Number,
                enum: [1,2,3,4,5]
            }
    },
     nature: {
        story: {
            type: String,
            required: true
        },
        review: {
            type: String,
        },
        rating: {
                type: Number,
                enum: [1,2,3,4,5]
            }
    },
     music: {
        story: {
            type: String,
            required: true
        },
        review: {
            type: String,
        },
        rating: {
                type: Number,
                enum: [1,2,3,4,5]
            }
    },
    colours: {
        type: [String],
        enum: ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'grey', 'black', 'white']
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    country: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Country',
        // required: true
    },
    })

module.exports = mongoose.model('Quest', questSchema)