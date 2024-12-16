import mongoose from 'mongoose';

const animeListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  animeEntries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Anime'
  }]
});

const gameListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  gameEntries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game'
  }]
});

const movieListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  movieEntries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie'
  }]
});

export const AnimeList = mongoose.model('AnimeList', animeListSchema);
export const GameList = mongoose.model('GameList', gameListSchema);
export const MovieList = mongoose.model('MovieList', movieListSchema); 