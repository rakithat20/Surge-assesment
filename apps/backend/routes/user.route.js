import express from "express";
import { updateProfile, getUser } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const Router = express.Router();

Router.patch("/profile", upload.single("avatar"), updateProfile);
Router.get("/profile", getUser);

export default Router;
