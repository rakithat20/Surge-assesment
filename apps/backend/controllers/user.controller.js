import { uploadAvatar } from "../config/cloudinary.config.js";
import UserModel from "../models/user.model.js";
import fs from "fs";

const userModel = new UserModel();

export const updateProfile = async (req, res) => {
  try {
    const { id, username, bio } = req.body;

    const avatar = req.file;

    if (!avatar) {
      return res.status(400).json({ message: "Avatar file is required." });
    }

    const uploadResult = await uploadAvatar(avatar.path);
    const avatar_url = uploadResult.secure_url;
    await userModel.updateProfile(id, {
      username,
      bio,
      avatar_url,
    });
    res.json({
      message: "Profile updated successfully",
      avatarUrl: uploadResult.secure_url,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      res.status(401).json({ message: "username required" });
    }
    const user = await userModel.findByUsername(username);
    res.status(200).json(user);
  } catch (error) {
    res.sendStatus(500);
  }
};
