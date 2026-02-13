const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');
const authRouter = require('./controllers/auth')
const usersRouter = require ('./controllers/users')
const questsRouter = require('./controllers/quests')
const countriesRouter = require('./controllers/countries')
const seedCountries = require('./seed/seedCountries');
const Country = require('./models/country')

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', async () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
  const count = await Country.countDocuments();
  if (count === 0) {
    console.log('Seeding countries...');
    await seedCountries();
  } else {
    console.log('Countries already seeded, skipping...');
  }
});

app.use(express.json())
app.use(cors())
app.use(logger('dev'))
app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/countries', countriesRouter)
app.use('/users/:userId/quests', questsRouter)


const PORT = 3000
app.listen (PORT,() => {
    console.log(`Server running on ${PORT} `)
})