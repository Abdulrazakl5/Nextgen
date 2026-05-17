const express = require('express');
const Person = require('../models/Person');
const User = require('../models/User');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Basic search
router.get('/', async (req, res) => {
  try {
    const { firstName, lastName, dateOfBirth, country, page = 1, limit = 20 } = req.query;

    const query = {};
    if (firstName) query.firstName = { $regex: firstName, $options: 'i' };
    if (lastName) query.lastName = { $regex: lastName, $options: 'i' };
    if (dateOfBirth) query.dateOfBirth = new Date(dateOfBirth);
    if (country) query.country = { $regex: country, $options: 'i' };

    const skip = (page - 1) * limit;
    const people = await Person.find(query)
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ createdAt: -1 });

    const total = await Person.countDocuments(query);

    res.json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
      data: people,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Advanced search
router.post('/advanced', async (req, res) => {
  try {
    const { firstName, lastName, dateOfBirth, country, city, occupation, page = 1, limit = 20 } = req.body;

    const query = {};
    if (firstName) query.firstName = { $regex: firstName, $options: 'i' };
    if (lastName) query.lastName = { $regex: lastName, $options: 'i' };
    if (dateOfBirth) query.dateOfBirth = new Date(dateOfBirth);
    if (country) query.country = { $regex: country, $options: 'i' };
    if (city) query.city = { $regex: city, $options: 'i' };
    if (occupation) query.occupation = { $regex: occupation, $options: 'i' };

    const skip = (page - 1) * limit;
    const people = await Person.find(query)
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ createdAt: -1 });

    const total = await Person.countDocuments(query);

    res.json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
      data: people,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Full-text search
router.get('/fulltext/:query', async (req, res) => {
  try {
    const { query, page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const people = await Person.find(
      { $text: { $search: query } },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Person.countDocuments({ $text: { $search: query } });

    res.json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
      data: people,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
