import cloudinary from '../utils/cloudinary.js';
import User from '../models/user.model.js';

// Modify user profile
export const updateProfile = async (req, res) => {
  try {

    const userId = req.user.id; // Extracted from auth middleware
    const { username, email } = req.body;
    let profileImg;

    // If a file is uploaded, upload to Cloudinary
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'profile_pictures' },
          (error, result) => {
            if (error) reject(new Error('Image upload failed'));
            else resolve(result);
          }
        ).end(req.file.buffer);
      });
      profileImg = result.secure_url;
    }

    // Find user and update fields
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...(username && { username }),
        ...(email && { email }),
        ...(profileImg && { profileImg }),
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });

  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user details by ID
export const getUserById = async (req, res) => {
  try {

    const { id } = req.params;
    const user = await User.findById(id).select('-password'); 

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ user });

  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};
