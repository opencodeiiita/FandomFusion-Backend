import { Router } from 'express';
import { getAnimeList } from '../../controllers/userLists.controller.js';
import authMiddleware from '../../middlewares/userAuth.middleware.js';

const router = Router();

// Define route for fetching user's anime list
router.get('/list', authMiddleware, getAnimeList);

export default router;
