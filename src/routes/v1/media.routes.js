import express from 'express';
import { getGameDetails, searchAnime ,searchGame,topAnime} from '../../controllers/media.controller.js';
import userAuthMiddleware from '../../middlewares/userAuth.middleware.js';

const router = express.Router();

router.get('/anime/top', topAnime);
router.get('/anime/search', userAuthMiddleware, searchAnime);
router.get('/game/search', userAuthMiddleware, searchGame);
router.get('/game/details/:id', userAuthMiddleware, getGameDetails);
export default router;