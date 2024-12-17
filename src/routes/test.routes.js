import { Router } from "express";
import userAuthMiddleware from "../middlewares/userAuth.middleware.js";

const router = Router();

router.get("/", userAuthMiddleware, (req, res) => {
  res.json({
    message: "You have accessed a protected route!",
    user: req.user,
  });
});

export default router;
