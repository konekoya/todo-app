import { Router, Response } from 'express';
import prisma from '../lib/prisma';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Get user settings
router.get('/settings', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        themePreference: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get user settings error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user settings
router.patch('/settings', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { themePreference } = req.body;

    if (themePreference && !['light', 'dark'].includes(themePreference)) {
      return res.status(400).json({ error: 'Invalid theme preference' });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { themePreference },
      select: {
        id: true,
        email: true,
        themePreference: true,
      },
    });

    res.json(user);
  } catch (error) {
    console.error('Update user settings error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
