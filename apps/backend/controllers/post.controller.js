import { uploadPost } from "../config/cloudinary.config.js";
import PostModel from "../models/post.model.js";

const postModel = new PostModel();

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.getAllPosts(req.user.id);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
};
// Get Post by id
export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postModel.getPost(id, req.user.id);
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
};

// Create post
export const createPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Image file is required." });
    }

    const uploadResult = await uploadPost(file.path);
    const imageUrl = uploadResult.secure_url;

    const post = await postModel.createPost(req.user.id, caption, imageUrl);

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error creating post", error: error.message });
  }
};

// Like/unlike post
export const toggleLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const action = await postModel.toggleLike(req.user.id, postId);
    res.json({ message: `Post ${action}` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating like", error: error.message });
  }
};

export const getFollowing = async (req, res) => {
  try {
    const posts = await postModel.getFollowingPosts(req.user.id);
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching posts" });
  }
};
export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    const usersPosts = await postModel.getPost(postId, req.user.id);
    const post = usersPosts[0];

    if (!post || post.user_id !== req.user.id) {
      return res.status(404).json({
        message: "Post not found or you are not authorized to delete it",
      });
    }

    const result = await postModel.deletePost(postId);

    if (result > 0) {
      return res.status(200).json({ message: "Post deleted successfully" });
    } else {
      return res.status(500).json({ message: "Failed to delete post" });
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
