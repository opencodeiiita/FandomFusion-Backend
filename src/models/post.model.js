import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  publicDbId: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  profileImg: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['anime', 'movie', 'game'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Post = mongoose.model('Post', postSchema);
export default Post;