import express from "express";
import { upload } from "../middleware/multer.middleware.js";

import {
  getAllPosts,
  createPost,
  toggleLike,
  getPost,
  getFollowingPosts,
} from "../controllers/post.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authenticate, getAllPosts);
router.post("/", upload.single("image"), authenticate, createPost);
router.post("/:postId/like", authenticate, toggleLike);
router.get("/:id", authenticate, getPost);

export default router;
