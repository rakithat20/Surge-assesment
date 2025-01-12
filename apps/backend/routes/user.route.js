import express from "express";
import {
  updateProfile,
  getUser,
  viewUser,
  getUserPosts,
  searchUser,
  followrUser,
  UnfollowrUser,
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { authenticate } from "../middleware/auth.middleware.js";

const Router = express.Router();

Router.patch("/profile", upload.single("avatar"), updateProfile);
Router.get("/profile", authenticate, getUser);
Router.get("/profile/:username", authenticate, viewUser);
Router.get("/:username/posts", authenticate, getUserPosts);
Router.get("/:searchquery", authenticate, searchUser);
Router.post("/follow", authenticate, followrUser);
Router.post("/unfollow", authenticate, UnfollowrUser);

export default Router;
