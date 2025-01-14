import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const createPost = async (req, res) => {
  try {
    const { publicDbId, type, text, imageUrl } = req.body;

    if (!publicDbId || !type || !text || !imageUrl) {
      return res.status(400).json({ status: 'error', message: 'Missing required fields: publicDbId, type, text, or imageUrl.' });
    }

    // retrieve user details from session
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found.' });
    }
    const { username, profileImg } = user;

    const newPost = new Post({
      publicDbId,
      type,
      text,
      imageUrl,
      username,
      userId,
      profileImg,
    });

    const savedPost = await newPost.save();

    res.status(201).json({ status: 'success', data: savedPost});
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const userId = req.user.id;

    const posts = await Post.find({ userId });

    if (!posts.length) {
      return res.status(404).json({ status: 'error', message: 'No posts found for the user.' });
    }

    res.status(200).json({status: 'success', data: posts});
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};



export const getFriendsPosts = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { limit = 10 } = req.query;

 
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

   
    const friendsPosts = await Post.find({ userId: { $in: user.friends } })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .select('publicDbId imageUrl text username userId profileImg type createdAt');

    res.status(200).json({ status: 'success', data: friendsPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};


export const getGlobalPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const { limit = 10 } = req.query;

   
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

   
    const globalPosts = await Post.find({ userId: { $nin: user.friends } })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .select('publicDbId imageUrl text username userId profileImg type createdAt');

    res.status(200).json({ status: 'success', data: globalPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};