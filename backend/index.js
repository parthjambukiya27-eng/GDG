const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Database Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/gdg-iitbhilai';
mongoose.connect(mongoURI)
  .then(() => console.log('Successfully connected to MongoDB database!'))
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
