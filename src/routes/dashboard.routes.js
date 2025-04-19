import express from 'express';
import { getDashboardStats } from '../controllers/dashboard.controller.js';

const router = express.Router();

// TODO: Add dashboard routes
router.get('/stats', getDashboardStats);

export default router; 