const mongoose = require('mongoose')

const userSchema = new mongoose.Schema ({
    username: { 
      type: String,
      required: true 
    },
    hashedPassword: { 
      type: String, 
      required: true 
    },
    name: { 
      type: String 
    },
    quests: [{ 
              type: mongoose.Schema.Types.ObjectId, 
              ref: 'Quest' 
            }],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  }
});

module.exports = mongoose.model('User', userSchema)