import express from "express"
import { createPost, getUserPosts } from "../../controllers/post.controller.js";
import userAuthMiddleware from "../../middlewares/userAuth.middleware.js";

const router = express.Router()

router.post("/create", userAuthMiddleware, createPost);
router.get("/user", userAuthMiddleware, getUserPosts);

export default router;