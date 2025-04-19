import express from 'express';
const router = express.Router();

// TODO: Add application routes
router.get('/', (req, res) => {
  res.json({ message: 'Applications route' });
});

export default router; 