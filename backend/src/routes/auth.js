const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Placeholder for database connection
const db = {}; // Will be replaced with actual DB

// Register Endpoint
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, userType } = req.body;

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // TODO: Save user to database
    const user = {
      id: Math.random().toString(36).substring(7),
      email,
      password: hashedPassword,
      name,
      userType: userType || 'buyer',
      createdAt: new Date()
    };

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user.id, email, name, userType: user.userType }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login Endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // TODO: Find user in database and verify password
    const user = { id: '123', email, userType: 'buyer' };

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.id, email, userType: user.userType }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Logout Endpoint
router.post('/logout', (req, res) => {
  // TODO: Invalidate token in Redis
  res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;
