const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const RbacRoles = ['coordinator', 'coremember', 'mentor', 'member', 'user'];

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
    const { name, email, username, password, interests } = req.body;
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUsername = username ? username.trim().toLowerCase() : null;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    // Check if email already exists
    let existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email address' });
    }

    // Check if username already exists (if provided)
    if (normalizedUsername) {
      existingUser = await User.findOne({ username: normalizedUsername });
      if (existingUser) {
        return res.status(400).json({ message: 'This username is already taken' });
      }
    }

    // Create user instance
    const user = new User({
      name,
      fullName: name,
      email: normalizedEmail,
      username: normalizedUsername,
      password,
      role: 'user',
      interests: interests || []
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
        email: user.email,
        username: user.username
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
            fullName: user.fullName || user.name,
            email: user.email,
            username: user.username,
            role: user.role,
            profilePhotoUrl: user.profilePhotoUrl,
            bio: user.bio,
            interests: user.interests,
            avatarUrl: user.avatarUrl || user.profilePhotoUrl
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
    console.log('LOGIN_REQUEST_BODY', req.body);
    const { identifier, password, email } = req.body;
    const loginIdentifier = typeof identifier === 'string' ? identifier : (typeof email === 'string' ? email : '');
    const passwordValue = typeof password === 'string' ? password : '';

    console.log('LOGIN_NORMALIZED', { loginIdentifier, passwordValue });

    if (!loginIdentifier.trim() || !passwordValue) {
      return res.status(400).json({ message: 'Email/username and password are required' });
    }

    const normalizedIdentifier = loginIdentifier.trim().toLowerCase();
    const user = await User.findOne({
      $or: [
        { email: normalizedIdentifier },
        { username: normalizedIdentifier }
      ]
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(passwordValue, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username
      }
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'gdg_iitbhilai_super_secret_key_123!',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        fullName: user.fullName || user.name,
        email: user.email,
        username: user.username,
        role: user.role,
        profilePhotoUrl: user.profilePhotoUrl,
        bio: user.bio,
        interests: user.interests,
        avatarUrl: user.avatarUrl || user.profilePhotoUrl
      }
    });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// @route   GET api/auth/users
// @desc    Get all registered users for coordinator dashboard
// @access  Private
router.get('/users', async (req, res) => {
  try {
    const token = getTokenFromHeader(req);
    if (!token) return res.status(401).json({ message: 'No authorization token, access denied' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'gdg_iitbhilai_super_secret_key_123!');
    const requester = await User.findById(decoded.user.id);
    if (!requester || requester.role !== 'coordinator') {
      return res.status(403).json({ message: 'Coordinator access required' });
    }

    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json({ users });
  } catch (error) {
    console.error('Get Users Error:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT api/auth/users/:id/role
// @desc    Update a user role
// @access  Private
router.put('/users/:id/role', async (req, res) => {
  try {
    const token = getTokenFromHeader(req);
    if (!token) return res.status(401).json({ message: 'No authorization token, access denied' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'gdg_iitbhilai_super_secret_key_123!');
    const requester = await User.findById(decoded.user.id);
    if (!requester || requester.role !== 'coordinator') {
      return res.status(403).json({ message: 'Coordinator access required' });
    }

    const { role } = req.body;
    if (!RbacRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'Role updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Update Role Error:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET api/auth/featured-team
// @desc    Return only featured leadership profiles for the home page cards
// @access  Public
router.get('/featured-team', async (req, res) => {
  try {
    const featuredRoles = ['coordinator', 'mentor', 'coremember'];
    const users = await User.find({ role: { $in: featuredRoles } })
      .select('-password')
      .sort({ createdAt: -1 });

    const roleRank = { coordinator: 0, mentor: 1, coremember: 2 };
    const sortedUsers = [...users].sort((a, b) => {
      const roleDiff = (roleRank[a.role] ?? 99) - (roleRank[b.role] ?? 99);
      if (roleDiff !== 0) return roleDiff;

      const nameA = (a.fullName || a.name || a.username || '').toLowerCase();
      const nameB = (b.fullName || b.name || b.username || '').toLowerCase();
      return nameA.localeCompare(nameB);
    });

    const formattedUsers = sortedUsers.map((user) => ({
      _id: user._id,
      name: user.name,
      fullName: user.fullName || user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      profilePhotoUrl: user.profilePhotoUrl || user.avatarUrl,
      bio: user.bio,
      avatarUrl: user.avatarUrl || user.profilePhotoUrl
    }));

    res.json({ users: formattedUsers });
  } catch (error) {
    console.error('Featured Team Error:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET api/auth/users/:id
// @desc    Get a specific user by ID (public profile)
// @access  Public
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        fullName: user.fullName || user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        profilePhotoUrl: user.profilePhotoUrl || user.avatarUrl,
        bio: user.bio,
        interests: user.interests,
        avatarUrl: user.avatarUrl || user.profilePhotoUrl,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Get User Error:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT api/auth/users/:id/transfer-coordinator
// @desc    Transfer coordinator role to a selected member and demote the current coordinator
// @access  Private
router.put('/users/:id/transfer-coordinator', async (req, res) => {
  try {
    const token = getTokenFromHeader(req);
    if (!token) return res.status(401).json({ message: 'No authorization token, access denied' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'gdg_iitbhilai_super_secret_key_123!');
    const requester = await User.findById(decoded.user.id);
    if (!requester || requester.role !== 'coordinator') {
      return res.status(403).json({ message: 'Coordinator access required' });
    }

    const targetUser = await User.findById(req.params.id);
    if (!targetUser) return res.status(404).json({ message: 'Member not found' });
    if (targetUser.role !== 'member') {
      return res.status(400).json({ message: 'Only member accounts can be promoted to coordinator' });
    }

    requester.role = 'member';
    targetUser.role = 'coordinator';
    await requester.save();
    await targetUser.save();

    res.json({
      message: 'Coordinator transferred successfully',
      currentUser: {
        id: requester.id,
        name: requester.name,
        fullName: requester.fullName || requester.name,
        email: requester.email,
        username: requester.username,
        role: requester.role,
        profilePhotoUrl: requester.profilePhotoUrl,
        bio: requester.bio,
        avatarUrl: requester.avatarUrl || requester.profilePhotoUrl
      },
      newCoordinator: {
        id: targetUser.id,
        name: targetUser.name,
        fullName: targetUser.fullName || targetUser.name,
        email: targetUser.email,
        username: targetUser.username,
        role: targetUser.role,
        profilePhotoUrl: targetUser.profilePhotoUrl,
        bio: targetUser.bio,
        avatarUrl: targetUser.avatarUrl || targetUser.profilePhotoUrl
      }
    });
  } catch (error) {
    console.error('Transfer Coordinator Error:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT api/auth/profile
// @desc    Update user profile data including name/photo/bio
// @access  Private
router.put('/profile', async (req, res) => {
  try {
    const token = getTokenFromHeader(req);
    if (!token) {
      return res.status(401).json({ message: 'No authorization token, access denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'gdg_iitbhilai_super_secret_key_123!');
    const userId = decoded.user.id;
    const { fullName, profilePhotoUrl, bio } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (fullName !== undefined) {
      user.name = fullName;
      user.fullName = fullName;
    }
    if (profilePhotoUrl !== undefined) {
      user.profilePhotoUrl = profilePhotoUrl;
      user.avatarUrl = profilePhotoUrl;
    }
    if (bio !== undefined) {
      user.bio = bio;
    }

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user.id,
        name: user.name,
        fullName: user.fullName || user.name,
        email: user.email,
        username: user.username,
        role: user.role,
        profilePhotoUrl: user.profilePhotoUrl,
        bio: user.bio,
        interests: user.interests,
        avatarUrl: user.avatarUrl || user.profilePhotoUrl
      }
    });
  } catch (error) {
    console.error('Update Profile Error:', error.message);
    res.status(500).json({ message: 'Server Error' });
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
