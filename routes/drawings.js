const express = require('express');
const Drawing = require('../models/Drawing');
const jwt = require('jsonwebtoken');
const router = express.Router();

const authenticate = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

router.post('/save', authenticate, async (req, res) => {
  const { drawingData } = req.body;
  try {
    const drawing = new Drawing({ userId: req.userId, drawingData });
    await drawing.save();
    res.status(201).json({ message: 'Drawing saved successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/retrieve', authenticate, async (req, res) => {
  try {
    const drawings = await Drawing.find({ userId: req.userId });
    res.status(200).json(drawings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;