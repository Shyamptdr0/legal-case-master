const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/userdata', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/update', authMiddleware, async (req, res) => {
  try {
    if (!req.body.username || !req.body.email) {
      return res.status(400).json({ message: 'Username and email are required' });
    }
    if (req.body.username.length < 3) {
      return res.status(400).json({ message: 'Username must be at least 3 characters long' });
    }
    // use regex to check mail
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }
    const user = await User.findByIdAndUpdate(req.userId,{username:req.body.username,email:req.body.email});
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
