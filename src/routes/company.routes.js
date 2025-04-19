import express from 'express';
import Company from '../models/Company.js';

const router = express.Router();

// Get all companies with search functionality
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    let searchCondition = {};
    
    if (query) {
      searchCondition = {
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { industry: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } }
        ]
      };
    }

    const companies = await Company.find(searchCondition);
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 