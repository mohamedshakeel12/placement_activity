import express from 'express';
const router = express.Router();

// TODO: Add user routes
router.get('/profile', (req, res) => {
  res.json({ message: 'User profile route' });
});

export default router; 