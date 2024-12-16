import mongoose from 'mongoose';

const animeSchema = new mongoose.Schema({
  publicDbId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: [
      'Planning to Watch',
      'Watching',
      'Completed',
      'On Hold'
    ],
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: null
  }
});

const Anime = mongoose.model('Anime', animeSchema);
export default Anime;