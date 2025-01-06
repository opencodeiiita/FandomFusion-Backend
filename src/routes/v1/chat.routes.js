import express from "express";
import { sendMessage, getChatHistory } from "../../controllers/chat.controller.js";
import userAuthMiddleware from "../../middlewares/userAuth.middleware.js";

const router = express.Router();

router.post("/send", userAuthMiddleware, sendMessage);
router.get("/history", userAuthMiddleware, getChatHistory);

export default router;
