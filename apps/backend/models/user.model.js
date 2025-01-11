import db from "../config/db.config.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

class UserModel {
  async create({ email, password, username, fullName, googleId = null }) {
    let hashedPassword = null;

    if (password) {
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    const query = `
      INSERT INTO users (
        email, 
        password_hash, 
        username,
        full_name,
        google_id
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, email, username, full_name, google_id, created_at;
    `;

    try {
      const { rows } = await db.query(query, [
        email,
        hashedPassword,
        username,
        fullName,
        googleId,
      ]);
      return rows[0];
    } catch (error) {
      if (error.code === "23505") {
        if (error.constraint === "users_email_key") {
          throw new Error("Email already exists");
        }
        if (error.constraint === "users_username_key") {
          throw new Error("Username already taken");
        }
        if (error.constraint === "users_google_id_key") {
          throw new Error("Google account already linked");
        }
      }
      throw error;
    }
  }

  async findById(id) {
    const query = `
      SELECT 
        id, 
        email, 
        username, 
        full_name,
        bio,
        avatar_url,
        google_id,
        created_at,
        updated_at
      FROM users 
      WHERE id = $1;
    `;

    try {
      const { rows } = await db.query(query, [id]);
      return rows[0] || null;
    } catch (error) {
      throw new Error("Error finding user");
    }
  }

  async findByEmail(email) {
    const query = `
      SELECT * FROM users WHERE email = $1;
    `;
    const result = await db.query(query, [email]);
    return result.rows[0];
  }

  async findByUsername(username) {
    const query = `
      SELECT * FROM users WHERE username = $1;
    `;

    try {
      const result = await db.query(query, [username]);
      return result.rows[0];
    } catch (error) {
      throw new Error("User Not found");
    }
  }

  async findByGoogleId(googleId) {
    const query = `
      SELECT * FROM users WHERE google_id = $1;
    `;

    try {
      const result = await db.query(query, [googleId]);
      return result.rows[0];
    } catch (error) {
      throw new Error("User Not found");
    }
  }

  async linkGoogleAccount(email, googleId) {
    const query = `
      UPDATE users 
      SET 
        google_id = $2,
        updated_at = CURRENT_TIMESTAMP
      WHERE email = $1
      RETURNING id, email, username, full_name, google_id, created_at, updated_at;
    `;

    try {
      const { rows } = await db.query(query, [email, googleId]);
      return rows[0];
    } catch (error) {
      if (
        error.code === "23505" &&
        error.constraint === "users_google_id_key"
      ) {
        throw new Error("Google account already linked to another user");
      }
      throw error;
    }
  }

  async verifyPassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }

  async updateProfile(id, { username, bio, avatar_url }) {
    console.log(avatar_url);
    const query = `
      UPDATE users 
      SET 
        username = COALESCE($2, username),
        bio = COALESCE($3, bio),
        avatar_url = COALESCE($4, avatar_url),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING id, email, username, bio, avatar_url, created_at, updated_at;
    `;

    try {
      const values = [id, username, bio, avatar_url];
      const { rows } = await db.query(query, values);
      return rows[0];
    } catch (error) {
      throw new Error("User Not found");
    }
  }
}

export default UserModel;
