import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  publicDbId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: [
      'Planning to Play',
      'Playing',
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

const Game = mongoose.model('Game', gameSchema);
export default Game;