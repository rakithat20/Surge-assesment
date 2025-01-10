import express from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";

const Router = express.Router();

Router.post("/login", loginUser);
Router.post("/register", registerUser);

export default Router;
