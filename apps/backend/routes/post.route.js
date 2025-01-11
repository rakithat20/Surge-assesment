import express from "express";
import { upload } from "../middleware/multer.middleware.js"; // Import multer middleware

import {
  getAllPosts,
  createPost,
  toggleLike,
} from "../controllers/post.controller.js";

const router = express.Router();

// Get all posts
router.get("/", getAllPosts);

// Create a post
router.post("/", upload.single("image"), createPost);

// Like/unlike a post
router.post("/:postId/like", toggleLike);

export default router;
