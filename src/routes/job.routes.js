import express from 'express';
const router = express.Router();

// TODO: Add job routes
router.get('/', (req, res) => {
  res.json({ message: 'Jobs route' });
});

export default router; 