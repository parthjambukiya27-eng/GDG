const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

const User = require('./models/User');

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Database Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/gdg-iitbhilai';
mongoose.connect(mongoURI)
  .then(async () => {
    console.log('Successfully connected to MongoDB database!');
    const existingCoordinator = await User.findOne({ email: 'krish@example.com' });
    if (!existingCoordinator) {
      const bcrypt = require('bcryptjs');
      const coordinator = new User({
        name: 'Krish',
        fullName: 'Krish Shiyani',
        username: 'krish',
        email: 'krish@example.com',
        password: await bcrypt.hash('Krish@123', 10),
        role: 'coordinator',
        profilePhotoUrl: 'https://ui-avatars.com/api/?name=Krish+Shiyani&background=4285F4&color=ffffff&rounded=true',
        bio: 'Coordinator for the GDG campus community.'
      });
      await coordinator.save();
      console.log('Seeded coordinator account for Krish.');
    }
  })
  .catch(err => {
    console.error('MongoDB database connection error:', err.message);
  });

// API Routes
app.use('/api/auth', require('./routes/auth'));

// Base Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to GDG on Campus IIT Bhilai Chapter Backend API Service!' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}...`);
});
