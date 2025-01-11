import express from 'express';
import upload from '../../middlewares/upload.middleware.js';
import userAuthMiddleware from '../../middlewares/userAuth.middleware.js';
import { updateProfile, getUserById } from '../../controllers/userProfile.controller.js';
import { sendFriendRequest, getFriendRequests, respondToFriendRequest } from '../../controllers/friendRequest.controller.js';
import { searchUsers,getUserFriends } from '../../controllers/user.controller.js';
const router = express.Router();

// Modify user profile (username, email, profile picture)
router.patch('/profile', userAuthMiddleware, upload.single('profileImg'), updateProfile);

// Get user details by ID
router.get('/getUser/:id', userAuthMiddleware, getUserById);


router.post('/friend-requests', userAuthMiddleware, sendFriendRequest);
router.get('/friend-requests', userAuthMiddleware, getFriendRequests);
router.post('/friend-requests/respond', userAuthMiddleware, respondToFriendRequest);
router.get('/search', userAuthMiddleware, searchUsers);
router.get('/friends', userAuthMiddleware, getUserFriends);



export default router;
