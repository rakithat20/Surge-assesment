// controllers/auth.controller.js
import UserModel from "../models/user.model.js";

const userModel = new UserModel();

export const loginUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if ((!username && !email) || !password) {
      return res
        .status(400)
        .json({ message: "Email / Username and Password required" });
    }

    let user;
    if (email) {
      user = await userModel.findByEmail(email);
    } else if (username) {
      user = await userModel.findByUsername(username);
    }

    if (!user || !user.password_hash) {
      return res
        .status(404)
        .json({ message: "User not found or invalid credentials" });
    }

    const isPwValid = await userModel.verifyPassword(
      password,
      user.password_hash
    );
    if (!isPwValid) {
      return res.status(401).json({ message: "Bad credentials" });
    }

    delete user.password_hash;
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Error logging in" });
      }
      res.status(200).json(user);
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;

    if (!username || !email || !password || !fullName) {
      return res
        .status(400)
        .json({ message: "Email, Username fullname & Password required" });
    }

    const user = await userModel.create({
      email,
      password,
      username,
      fullName,
    });

    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Error logging in" });
      }
      res.status(200).json(user);
    });
  } catch (error) {
    res.status(406).json({ error: error.message });
  }
};

export const googleCallback = (req, res) => {
  if (req.user) {
    return res.redirect(process.env.FRONTEND_URL);
  }
  res.status(401).json({ message: "Authentication failed" });
};

export const logout = (req, res) => {
  req.logout(() => {
    res.status(200).json({ message: "Logged out successfully" });
  });
};

export const checkAuthStatus = (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({
      authenticated: true,
      user: req.user,
    });
  } else {
    res.status(401).json({
      authenticated: false,
    });
  }
};
