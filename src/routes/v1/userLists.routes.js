const express = require('express');
const router = express.Router();
const userListsController = require('../../controllers/userLists.controllers');
const authenticate = require('../../middlewares/authenticate'); 

router.post('/lists/anime', authenticate, userListsController.addAnimeToList);
router.post('/lists/games', authenticate, userListsController.addGameToList);
router.post('/lists/movies', authenticate, userListsController.addMovieToList);

module.exports = router;
