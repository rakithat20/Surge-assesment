import db from "../config/db.config.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

class UserModel {
  async create({ email, password, username }) {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const query = `
          INSERT INTO users (email, password_hash, username)
          VALUES ($1, $2, $3)
          RETURNING id, email, username, created_at;
        `;

    try {
      const { rows } = await db.query(query, [email, hashedPassword, username]);
      return rows[0];
    } catch (error) {
      if (error.code === "23505") {
        // PostgreSQL unique violation error code
        if (error.constraint === "users_email_key") {
          throw new Error("Email already exists");
        }
        if (error.constraint === "users_username_key") {
          throw new Error("Username already taken");
        }
      }
      throw error;
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
  async verifyPassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }

  async updateProfile(userId, { username, bio, avatar_url }) {
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
      const values = [userId, username, bio, avatar_url];
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw new Error("User Not found");
    }
  }
}

export default UserModel;
