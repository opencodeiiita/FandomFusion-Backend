import express from 'express';
const router = express.Router();
import userAuthMiddleware from '../../middlewares/userAuth.middleware.js';
import { addAnimeToList, addGameToList, addMovieToList,getGameList } from '../../controllers/userLists.controller.js';
import {
    updateAnimeInList,
    updateGameInList,
    updateMovieInList,
    removeAnimeFromList,
    removeGameFromList,
    removeMovieFromList,
    getAnimeList
  } from '../../controllers/userLists.controller.js';

router.post('/anime/add', userAuthMiddleware, addAnimeToList);
router.post('/game/add', userAuthMiddleware, addGameToList);
router.post('/movie/add',userAuthMiddleware, addMovieToList);


// Update routes
router.patch('/anime/update/:id', userAuthMiddleware, updateAnimeInList);
router.patch('/games/update/:id', userAuthMiddleware, updateGameInList);
router.patch('/movies/update/:id', userAuthMiddleware, updateMovieInList);

// Remove routes
router.delete('/anime/remove/:id', userAuthMiddleware, removeAnimeFromList);
router.delete('/games/remove/:id', userAuthMiddleware, removeGameFromList);
router.delete('/movies/remove/:id', userAuthMiddleware, removeMovieFromList);

//Get anime list of a user
router.get('/anime', userAuthMiddleware, getAnimeList);
router.get('/game', userAuthMiddleware, getGameList);


export default router;
