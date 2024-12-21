import { AnimeList, GameList, MovieList } from '../models/list.model.js';
import Anime from '../models/Anime.model.js';
import Game from '../models/Game.model.js';
import Movie from '../models/Movie.model.js';
import User from '../models/user.model.js';
import mongoose from 'mongoose';

export const addAnimeToList = async (req, res) => {
    const { publicDbId, status, rating } = req.body;
    const userId = req.user.id;

    try {
        const user = await User.findById(userId).populate('animeList');
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        let animeList = user.animeList;
        if (!animeList) {
            animeList = new AnimeList({ user: userId, animeEntries: [] });
            await animeList.save();
            user.animeList = animeList._id;
            await user.save();
        }

        const animeExists = await Anime.findOne({ _id: { $in: animeList.animeEntries }, publicDbId });
        if (animeExists) {
            return res.status(400).json({ message: 'Anime already exists in the list.' });
        } 

        let anime = new Anime({ publicDbId, status, rating });
        await anime.save();

        animeList.animeEntries.push(anime._id);
        await animeList.save();

        res.status(201).json({ message: 'Anime added successfully to the list.', anime });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add anime to the list.', error: error.message });
    }
};

export const addGameToList = async (req, res) => {
    const { publicDbId, status, rating } = req.body;
    const userId = req.user.id;

    try {
        const user = await User.findById(userId).populate('gameList');
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        let gameList = user.gameList;
        if (!gameList) {
            gameList = new GameList({ user: userId, gameEntries: [] });
            await gameList.save();
            user.gameList = gameList._id;
            await user.save();
        }

        const gameExists = await Game.findOne({ _id: { $in: gameList.gameEntries }, publicDbId });
        if (gameExists) {
            return res.status(400).json({ message: 'Game already exists in the list.' });
        }

        let game = new Game({ publicDbId, status, rating });
        await game.save();

        gameList.gameEntries.push(game._id);
        await gameList.save();

        res.status(201).json({ message: 'Game added successfully to the list.', game });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add game to the list.', error: error.message });
    }
};

export const addMovieToList = async (req, res) => {
    const { publicDbId, status, rating } = req.body;
    const userId = req.user.id;

    try {
        const user = await User.findById(userId).populate('movieList');
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        let movieList = user.movieList;
        if (!movieList) {
            movieList = new MovieList({ user: userId, movieEntries: [] });
            await movieList.save();
            user.movieList = movieList._id;
            await user.save();
        }

        const movieExists = await Movie.findOne({ _id: { $in: movieList.movieEntries }, publicDbId });
        if (movieExists) {
            return res.status(400).json({ message: 'Movie already exists in the list.' });
        }

        let movie = new Movie({ publicDbId, status, rating });
        await movie.save();

        movieList.movieEntries.push(movie._id);
        await movieList.save();

        res.status(201).json({ message: 'Movie added successfully to the list.', movie });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add movie to the list.', error: error.message });
    }
};


export const updateAnimeInList = async (req, res) => {
  try {
    const animeId = req.params.id; // MongoDB ID for the Anime
    const { status, rating } = req.body;
    const userId = req.user.id; // Assuming user ID is available in req.user via middleware

    // Validate the MongoDB ID
    if (!animeId || !mongoose.Types.ObjectId.isValid(animeId)) {
      return res.status(400).json({ error: 'Invalid anime ID.' });
    }

    // Validate body fields
    if (!status && rating === undefined) {
        return res.status(400).json({ error: 'Please provide status or rating to update' });
      }
      if (status && !['Planning to Watch', 'Watching', 'Completed', 'On Hold'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status value' });
      }
      if (rating !== undefined && (isNaN(rating) || rating < 0 || rating > 10)) {
        return res.status(400).json({ error: 'Rating must be a number between 0 and 10' });
      }

    // Find the user's AnimeList
    const userAnimeList = await AnimeList.findOne({ user: userId });
    if (!userAnimeList) {
      return res.status(404).json({ error: 'User AnimeList not found.' });
    }

    // Check if the anime exists in the user's AnimeList
    if (!userAnimeList.animeEntries.includes(animeId)) {
      return res.status(404).json({ error: 'Anime not found in your list.' });
    }

    // Update the Anime in the Anime model
    const updateFields = {};
    if (status) updateFields.status = status;
    if (rating) updateFields.rating = rating;

    const updatedAnime = await Anime.findByIdAndUpdate(animeId, updateFields, { new: true });
    if (!updatedAnime) {
      return res.status(404).json({ error: 'Anime not found in the database.' });
    }

    // Respond with the updated anime details
    res.status(200).json({
      message: 'Anime updated successfully.',
      data: updatedAnime,
    });
  } catch (error) {
    console.error('Error updating anime in list:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
};


export const updateGameInList = async (req, res) => {
    try {
        const gameId = req.params.id; // MongoDB ID for the Game
        const { status, rating } = req.body;
        const userId = req.user.id; // Assuming user ID is available in req.user via middleware
    
        // Validate the MongoDB ID
        if (!gameId || !mongoose.Types.ObjectId.isValid(gameId)) {
            return res.status(400).json({ error: 'Invalid game ID.' });
        }
    
        // Validate body fields
        if (!status && rating === undefined) {
            return res.status(400).json({ error: 'Please provide status or rating to update' });
        }
        if (status && !['Planning to Play', 'Playing', 'Completed', 'On Hold'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status value' });
        }
        if (rating !== undefined && (isNaN(rating) || rating < 0 || rating > 10)) {
            return res.status(400).json({ error: 'Rating must be a number between 0 and 10' });
        }
    
        // Find the user's GameList
        const userGameList = await GameList.findOne({ user: userId });
        if (!userGameList) {
        return res.status(404).json({ error: 'User GameList not found.' });
        }
  
      // Check if the game exists in the user's GameList
      if (!userGameList.gameEntries.includes(gameId)) {
        return res.status(404).json({ error: 'Game not found in your list.' });
      }
  
      // Update the Game in the Game model
      const updateFields = {};
      if (status) updateFields.status = status;
      if (rating) updateFields.rating = rating;
  
      const updatedGame = await Game.findByIdAndUpdate(gameId, updateFields, { new: true });
      if (!updatedGame) {
        return res.status(404).json({ error: 'Game not found in the database.' });
      }
  
      // Respond with the updated game details
      res.status(200).json({
        message: 'Game updated successfully.',
        data: updatedGame,
      });
    } catch (error) {
      console.error('Error updating game in list:', error);
      res.status(500).json({ error: 'An internal server error occurred.' });
    }
  };

  export const updateMovieInList = async (req, res) => {
    try {
      const movieId = req.params.id; // MongoDB ID for the Movie
      const { status, rating } = req.body;
      const userId = req.user.id; // Assuming user ID is available in req.user via middleware
  
      // Validate the MongoDB ID
      if (!movieId || !mongoose.Types.ObjectId.isValid(movieId)) {
        return res.status(400).json({ error: 'Invalid movie ID.' });
      }
  
      // Validate body fields
      if (!status && rating === undefined) {
          return res.status(400).json({ error: 'Please provide status or rating to update' });
        }
        if (status && !['Planning to Watch', 'Watching', 'Completed', 'On Hold'].includes(status)) {
          return res.status(400).json({ error: 'Invalid status value' });
        }
        if (rating !== undefined && (isNaN(rating) || rating < 0 || rating > 10)) {
          return res.status(400).json({ error: 'Rating must be a number between 0 and 10' });
        }
  
      // Find the user's MovieList
      const userMovieList = await MovieList.findOne({ user: userId });
      if (!userMovieList) {
        return res.status(404).json({ error: 'User Movie List not found.' });
      }
  
      // Check if the movie exists in the user's MovieList
      if (!userMovieList.movieEntries.includes(movieId)) {
        return res.status(404).json({ error: 'Movie not found in your list.' });
      }
  
      // Update the movie in the Movie model
      const updateFields = {};
      if (status) updateFields.status = status;
      if (rating) updateFields.rating = rating;
  
      const updatedMovie = await Movie.findByIdAndUpdate(movieId, updateFields, { new: true });
      if (!updatedMovie) {
        return res.status(404).json({ error: 'Movie not found in the database.' });
      }
  
      // Respond with the updated anime details
      res.status(200).json({
        message: 'Movie updated successfully.',
        data: updatedMovie,
      });
    } catch (error) {
      console.error('Error updating movie in list:', error);
      res.status(500).json({ error: 'An internal server error occurred.' });
    }
  };


  export const removeAnimeFromList = async (req, res) => {
    try {
      const animeId = req.params.id; // MongoDB ID for the Anime
      const userId = req.user.id; // Assuming user ID is available in req.user via middleware
  
      // Validate the MongoDB ID
      if (!animeId || !mongoose.Types.ObjectId.isValid(animeId)) {
        return res.status(400).json({ error: 'Invalid anime ID.' });
      }
  
      // Find the user's AnimeList
      const userAnimeList = await AnimeList.findOne({ user: userId });
      if (!userAnimeList) {
        return res.status(404).json({ error: 'User AnimeList not found.' });
      }
  
      // Check if the anime exists in the user's AnimeList
      if (!userAnimeList.animeEntries.includes(animeId)) {
        return res.status(404).json({ error: 'Anime not found in your list.' });
      }
  
      // Remove the anime from the user's AnimeList
      userAnimeList.animeEntries = userAnimeList.animeEntries.filter(
        (entry) => entry.toString() !== animeId
      );
      await userAnimeList.save();
  
      await Anime.findByIdAndDelete(animeId);
  
      // Respond with success
      res.status(200).json({
        message: 'Anime removed successfully.',
      });
    } catch (error) {
      console.error('Error removing anime from list:', error);
      res.status(500).json({ error: 'An internal server error occurred.' });
    }
  };
  

export const removeGameFromList = async (req, res) => {
    try {
      const gameId = req.params.id; // MongoDB ID for the Game
      const userId = req.user.id; // Assuming user ID is available in req.user via middleware
  
      // Validate the MongoDB ID
      if (!gameId || !mongoose.Types.ObjectId.isValid(gameId)) {
        return res.status(400).json({ error: 'Invalid game ID.' });
      }
  
      // Find the user's GameList
      const userGameList = await GameList.findOne({ user: userId });
      if (!userGameList) {
        return res.status(404).json({ error: 'User GameList not found.' });
      }
  
      // Check if the game exists in the user's GameList
      if (!userGameList.gameEntries.includes(gameId)) {
        return res.status(404).json({ error: 'Game not found in your list.' });
      }
  
      // Remove the game from the user's GameList
      userGameList.gameEntries = userGameList.gameEntries.filter(
        (entry) => entry.toString() !== gameId
      );
      await userGameList.save();
  
      await Game.findByIdAndDelete(gameId);

      // Respond with success
      res.status(200).json({
        message: 'Game removed successfully.',
      });
    } catch (error) {
      console.error('Error removing game from list:', error);
      res.status(500).json({ error: 'An internal server error occurred.' });
    }
  };
  

export const removeMovieFromList = async (req, res) => {
  try {
    const movieId = req.params.id; // MongoDB ID for the Movie
    const userId = req.user.id; // Assuming user ID is available in req.user via middleware

    // Validate the MongoDB ID
    if (!movieId || !mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({ error: 'Invalid movie ID.' });
    }

    // Find the user's MovieList
    const userMovieList = await MovieList.findOne({ user: userId });
    if (!userMovieList) {
      return res.status(404).json({ error: 'User MovieList not found.' });
    }

    // Check if the movie exists in the user's MovieList
    if (!userMovieList.movieEntries.includes(movieId)) {
      return res.status(404).json({ error: 'Movie not found in your list.' });
    }

    // Remove the movie from the user's MovieList
    userMovieList.movieEntries = userMovieList.movieEntries.filter(
      (entry) => entry.toString() !== movieId
    );
    await userMovieList.save();

    await Movie.findByIdAndDelete(movieId);
    
    // Respond with success
    res.status(200).json({
      message: 'Movie removed successfully.',
    });
  } catch (error) {
    console.error('Error removing movie from list:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
};
