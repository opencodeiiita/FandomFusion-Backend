import express from "express"
const router = express.Router()

import userAuth from "../../controllers/userAuth.controller.js"

router.post("/register", userAuth.register);

export default router;