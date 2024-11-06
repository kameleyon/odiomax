import { Router } from 'express';
import { ttsRoutes } from './tts.routes.js';
import { authRoutes } from './auth.routes.js';

export const router = Router();

// Health check route
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// API routes
router.use('/auth', authRoutes);
router.use('/tts', ttsRoutes);