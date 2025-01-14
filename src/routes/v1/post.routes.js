import express from "express"
import { createPost, getUserPosts,getFriendsPosts,getGlobalPosts } from "../../controllers/post.controller.js";
import userAuthMiddleware from "../../middlewares/userAuth.middleware.js";

const router = express.Router()

router.post("/create", userAuthMiddleware, createPost);
router.get("/user", userAuthMiddleware, getUserPosts);

router.get('/friends', userAuthMiddleware, getFriendsPosts);
router.get('/global', userAuthMiddleware, getGlobalPosts);

export default router;