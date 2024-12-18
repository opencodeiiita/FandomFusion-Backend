import express from 'express';
import upload from '../../middlewares/upload.middleware.js';
import userAuthMiddleware from '../../middlewares/userAuth.middleware.js';
import { updateProfile, getUserById } from '../../controllers/userProfile.controller.js';

const router = express.Router();

// Modify user profile (username, email, profile picture)
router.patch('/profile', userAuthMiddleware, upload.single('profileImg'), updateProfile);

// Get user details by ID
router.get('/:id', userAuthMiddleware, getUserById);

export default router;
