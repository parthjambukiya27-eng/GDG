const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const getTokenFromHeader = (req) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return null;
  return authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : authHeader.trim();
};

// @route   POST api/auth/register
// @desc    Register a new developer user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, interests } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    // Check if user already exists
    let user = await User.findOne({ email: normalizedEmail });
    if (user) {
      return res.status(400).json({ message: 'User already exists with this email address' });
    }

    // Create user instance
    user = new User({
      name,
      email: normalizedEmail,
      password,
      interests
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to DB
    await user.save();

    // Create JWT Token
    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'gdg_iitbhilai_super_secret_key_123!',
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            interests: user.interests,
            avatarUrl: user.avatarUrl
          }
        });
      }
    );
  } catch (error) {
    console.error('Register Error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    // Find User
    let user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT Token
    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'gdg_iitbhilai_super_secret_key_123!',
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            interests: user.interests,
            avatarUrl: user.avatarUrl
          }
        });
      }
    );
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// @route   PUT api/auth/avatar
// @desc    Update user profile avatar picture
// @access  Private
router.put('/avatar', async (req, res) => {
  try {
    const token = getTokenFromHeader(req);
    if (!token) {
      return res.status(401).json({ message: 'No authorization token, access denied' });
    }

    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'gdg_iitbhilai_super_secret_key_123!');
    const userId = decoded.user.id;

    const { avatarUrl } = req.body;
    if (avatarUrl === undefined) {
      return res.status(400).json({ message: 'Please provide an avatar url' });
    }

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.avatarUrl = avatarUrl;
    await user.save();

    res.json({
      message: 'Avatar updated successfully',
      avatarUrl: user.avatarUrl
    });
  } catch (error) {
    console.error('Update Avatar Error:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   DELETE api/auth/delete
// @desc    Delete authenticated user account permanently
// @access  Private
router.delete('/delete', async (req, res) => {
  try {
    const token = getTokenFromHeader(req);
    if (!token) {
      return res.status(401).json({ message: 'No authorization token, access denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'gdg_iitbhilai_super_secret_key_123!');
    const userId = decoded.user.id;

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Delete Account Error:', error.message);
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
