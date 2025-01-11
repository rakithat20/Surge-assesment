import { uploadPost } from "../config/cloudinary.config.js";
import PostModel from "../models/post.model.js";

const postModel = new PostModel();

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
};

// Create post
export const createPost = async (req, res) => {
  try {
    const { caption, userId } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Image file is required." });
    }

    // Upload the image to Cloudinary
    const uploadResult = await uploadPost(file.path);
    const imageUrl = uploadResult.secure_url;

    // Create the post
    const post = await postModel.createPost(userId, caption, imageUrl);

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
    console.log(postId);
    const action = await postModel.toggleLike(req.user.id, postId);
    res.json({ message: `Post ${action}` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating like", error: error.message });
  }
};
