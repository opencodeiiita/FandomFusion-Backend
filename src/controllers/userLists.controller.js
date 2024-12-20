import { AnimeList, GameList, MovieList } from '../models/list.model.js';
import Anime from '../models/Anime.model.js';
import Game from '../models/Game.model.js';
import Movie from '../models/Movie.model.js';

export const addAnimeToList = async (req, res) => {
    const { publicDbId, status, rating } = req.body;
    const userId = req.user.id;

    try {
        let anime = await Anime.findOne({ publicDbId });
        
        if (!anime) {
            anime = new Anime({ publicDbId, status, rating });
            await anime.save();
        }

        const animeList = await AnimeList.findOne({ user: userId });

        if (!animeList) {
            const newAnimeList = new AnimeList({ user: userId, animeEntries: [anime._id] });
            await newAnimeList.save();
        } else {
            if (animeList.animeEntries.includes(anime._id)) {
                return res.status(400).json({ message: 'Anime already exists in the list.' });
            }
            animeList.animeEntries.push(anime._id);
            await animeList.save();
        }

        res.status(201).json({ message: 'Anime added successfully to the list.', anime });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add anime to the list.', error: error.message });
    }
};

export const addGameToList = async (req, res) => {
    const { publicDbId, status, rating } = req.body;
    const userId = req.user.id;

    try {
        let game = await Game.findOne({ publicDbId });
        
        if (!game) {
            game = new Game({ publicDbId, status, rating });
            await game.save();
        }

        const gameList = await GameList.findOne({ user: userId });

        if (!gameList) {
            const newGameList = new GameList({ user: userId, gameEntries: [game._id] });
            await newGameList.save();
        } else {
            if (gameList.gameEntries.includes(game._id)) {
                return res.status(400).json({ message: 'Game already exists in the list.' });
            }
            gameList.gameEntries.push(game._id);
            await gameList.save();
        }

        res.status(201).json({ message: 'Game added successfully to the list.', game });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add game to the list.', error: error.message });
    }
};

export const addMovieToList = async (req, res) => {
    const { publicDbId, status, rating } = req.body;
    const userId = req.user.id;

    try {
        let movie = await Movie.findOne({ publicDbId });
        
        if (!movie) {
            movie = new Movie({ publicDbId, status, rating });
            await movie.save();
        }

        const movieList = await MovieList.findOne({ user: userId });

        if (!movieList) {
            const newMovieList = new MovieList({ user: userId, movieEntries: [movie._id] });
            await newMovieList.save();
        } else {
            if (movieList.movieEntries.includes(movie._id)) {
                return res.status(400).json({ message: 'Movie already exists in the list.' });
            }
            movieList.movieEntries.push(movie._id);
            await movieList.save();
        }

        res.status(201).json({ message: 'Movie added successfully to the list.', movie });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add movie to the list.', error: error.message });
    }
};
