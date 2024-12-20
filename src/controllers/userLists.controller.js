import { AnimeList, GameList, MovieList } from '../models/list.model.js';
import Anime from '../models/Anime.model.js';
import Game from '../models/Game.model.js';
import Movie from '../models/Movie.model.js';
import User from '../models/user.model.js';

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

        let anime = await Anime.findOne({ publicDbId });
        if (!anime) {
            anime = new Anime({ publicDbId, status, rating });
            await anime.save();
        }

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

        let game = await Game.findOne({ publicDbId });
        if (!game) {
            game = new Game({ publicDbId, status, rating });
            await game.save();
        }

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

        let movie = await Movie.findOne({ publicDbId });
        if (!movie) {
            movie = new Movie({ publicDbId, status, rating });
            await movie.save();
        }

        movieList.movieEntries.push(movie._id);
        await movieList.save();

        res.status(201).json({ message: 'Movie added successfully to the list.', movie });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add movie to the list.', error: error.message });
    }
};
