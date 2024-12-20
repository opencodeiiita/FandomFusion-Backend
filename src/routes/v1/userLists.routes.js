import express from 'express';
const router = express.Router();
import userAuthMiddleware from '../../middlewares/userAuth.middleware.js';
import { addAnimeToList, addGameToList, addMovieToList } from '../../controllers/userLists.controller.js';

router.post('/anime/add', userAuthMiddleware, addAnimeToList);
router.post('/games/add', userAuthMiddleware, addGameToList);
router.post('/movies/add',userAuthMiddleware, addMovieToList);

export default router;
