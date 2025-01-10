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
      user = await userModel.findByUsername(username); // Assuming this method exists
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

    // Remove sensitive data before responding
    delete user.password_hash;
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const registerUser = async (req, res) => {
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
    res.status(406).json({ error: error.message });
  }
};
