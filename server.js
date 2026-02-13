// server.js
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');

const authRouter = require('./controllers/auth');
const usersRouter = require('./controllers/users');
const questsRouter = require('./controllers/quests');
const countriesRouter = require('./controllers/countries');

const seedCountries = require('./seed/seedCountries');
const Country = require('./models/country');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(logger('dev'));

// Routes
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/countries', countriesRouter);
app.use('/users/:userId/quests', questsRouter);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);

  // Seed countries asynchronously (non-blocking)
  (async () => {
    try {
      const count = await Country.countDocuments();
      if (count === 0) {
        console.log('Seeding countries...');
        await seedCountries();
        console.log('Countries seeded successfully');
      } else {
        console.log('Countries already seeded, skipping...');
      }
    } catch (err) {
      console.error('Error during country seeding:', err);
    }
  })();
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  console.log('Memory usage at startup:', process.memoryUsage());
});