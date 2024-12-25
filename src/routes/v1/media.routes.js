import express from 'express';
import { searchAnime } from '../../controllers/media.controller.js';
import userAuthMiddleware from '../../middlewares/userAuth.middleware.js';

const router = express.Router();

router.get('/anime/search', userAuthMiddleware, searchAnime);

export default router;