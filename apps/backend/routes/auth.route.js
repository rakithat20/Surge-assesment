import express from "express";
import UserModel from "../models/user.model.js";

const Router = express.Router();
const userModel = new UserModel();

Router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and Password required" });
    }

    const user = await userModel.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPwValid = await userModel.verifyPassword(
      password,
      user.password_hash
    );
    if (!isPwValid) {
      return res.status(401).json({ message: "Bad credentials" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

Router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Email, Username & Password required" });
    }

    const user = await userModel.create({ email, password, username });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default Router;
