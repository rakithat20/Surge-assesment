import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config({ path: "../../.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadAvatar = async (filePath) => {
  const res = await cloudinary.uploader.upload(filePath, {
    folder: "avatars",
  });
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
    }
  });
  return res;
};
export const uploadPost = async (filePath) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "posts",
  });

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
    }
  });
  return result;
};
