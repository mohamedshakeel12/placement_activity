import express from 'express';
const router = express.Router();

// TODO: Add authentication routes
router.post('/login', (req, res) => {
  res.json({ message: 'Login route' });
});

router.post('/register', (req, res) => {
  res.json({ message: 'Register route' });
});

export default router; 