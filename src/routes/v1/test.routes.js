import { Router } from "express";
import userAuthMiddleware from "../../middlewares/userAuth.middleware.js";
import upload from '../../middlewares/upload.middleware.js';

const router = Router();

router.get("/", userAuthMiddleware, (req, res) => {
  res.json({
    message: "You have accessed a protected route!",
    user: req.user,
  });
});

router.post('/upload', upload.single('profileImg'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // File details for testing
    res.status(200).json({
      message: 'File uploaded successfully',
      fileDetails: {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        bufferExists: !!req.file.buffer, // True if buffer is captured
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'File upload failed', error: error.message });
  }
});

export default router;
