import express from 'express';
import { getGameDetails, searchAnime ,searchGame,topAnime,searchMovies,getMovieList} from '../../controllers/media.controller.js';
import userAuthMiddleware from '../../middlewares/userAuth.middleware.js';

const router = express.Router();

router.get('/anime/top', topAnime);
router.get('/anime/search', userAuthMiddleware, searchAnime);
router.get('/game/search', userAuthMiddleware, searchGame);
router.get('/game/details/:id', userAuthMiddleware, getGameDetails);

router.get('/movie/search', userAuthMiddleware, searchMovies);
router.get('/movie/list', userAuthMiddleware, getMovieList);
export default router;