import User from "../models/user.model.js";


export const searchUsers = async (req, res) => {
  try {
    const searchQuery = req.query.search || '';
    const users = await User.find({
      username: { $regex: searchQuery, $options: 'i' } 
    }).select('id username profileImg'); 

    res.status(200).json({
      status: 'success',
      data: users,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};


export const getUserFriends = async (req, res) => {
    try {
      const userId = req.user.id; 
      const user = await User.findById(userId).populate({
        path: 'friends',
        select: 'id username profileImg',
      });
  
      if (!user) {
        return res.status(404).json({ status: 'error', message: 'User not found' });
      }
  
      res.status(200).json({
        status: 'success',
        data: user.friends,
      });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Server error' });
    }
  };
  
