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
const countriesRouter = require('./controllers/countries');



mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

app.use(express.json())
app.use(cors())
app.use(logger('dev'))
app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/users/:userId/quests', questsRouter)
app.use('/countries', countriesRouter);





const PORT = 3000
app.listen (PORT,() => {
    console.log(`Server running on ${PORT} `)
})