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
  async searchUser(term) {
    const query = `
    SELECT * FROM users 
    WHERE 
      username ILIKE $1 
      OR full_name ILIKE $1
  `;
    const searchTerm = `%${term}%`; // Add wildcards for partial matching

    try {
      const result = await db.query(query, [searchTerm]);
      return result.rows; // Return all matching rows, not just the first one
    } catch (error) {
      console.error("Search error:", error);
      throw new Error("Error searching for users");
    }
  }
  async viewUser(username, viewerId) {
    const query = `
     SELECT 
    u.id AS user_id,
    u.username,
    u.full_name,
    u.bio,
    u.avatar_url,
    u.created_at AS user_created_at,
    u.updated_at AS user_updated_at,
    (SELECT COUNT(*) FROM followers WHERE following_id = u.id) AS total_followers,
    (SELECT COUNT(*) FROM followers WHERE follower_id = u.id) AS total_following,
    (SELECT COUNT(*) FROM posts WHERE user_id = u.id) AS total_posts,
    (SELECT COUNT(*) FROM likes l 
     JOIN posts p ON p.id = l.post_id 
     WHERE p.user_id = u.id) AS total_likes_on_posts,
    EXISTS (
        SELECT 1 
        FROM followers 
        WHERE follower_id = $2 AND following_id = u.id
    ) AS is_following
FROM users u
WHERE u.username = $1;
    `;
    try {
      // Execute the query, passing the username and viewerId as parameters
      const result = await db.query(query, [username, viewerId]);
      return result.rows[0]; // Return the first row of the result
    } catch (error) {
      console.error("Error executing query:", error);
      throw error; // Rethrow the error if needed
    }
  }

  async getUserPosts(username) {
    const query = `
    SELECT
      p.id AS post_id,
      p.caption,
      p.image_url,
      p.created_at AS post_created_at,
      u.username,
      u.full_name,
      u.avatar_url,
      COUNT(l.id) AS likes_count 
    FROM
      posts p
    JOIN
      users u ON p.user_id = u.id
    LEFT JOIN
      likes l ON l.post_id = p.id  
    WHERE
      u.username = $1
    GROUP BY
      p.id, u.id;  
  `;

    try {
      const result = await db.query(query, [username]);
      return result.rows;
    } catch (error) {
      throw new Error("Posts not found");
    }
  }

  async toggleFollow(targetUsername, selfUserId) {
    const checkFollowQuery = `
      SELECT id 
      FROM followers 
      WHERE follower_id = $1 
        AND following_id = (SELECT id FROM users WHERE username = $2);
    `;

    const followQuery = `
      INSERT INTO followers (follower_id, following_id, created_at)
      SELECT $1, id, CURRENT_TIMESTAMP
      FROM users
      WHERE username = $2
      RETURNING id AS follow_id, follower_id, following_id, created_at;
    `;

    const unfollowQuery = `
      DELETE FROM followers
      WHERE follower_id = $1 
        AND following_id = (SELECT id FROM users WHERE username = $2)
      RETURNING id AS follow_id, follower_id, following_id, created_at;
    `;

    try {
      // Check if the user is already following the target
      const checkResult = await db.query(checkFollowQuery, [
        selfUserId,
        targetUsername,
      ]);

      if (checkResult.rows.length > 0) {
        // User is already following, so unfollow
        const unfollowResult = await db.query(unfollowQuery, [
          selfUserId,
          targetUsername,
        ]);
        return { status: "unfollowed", ...unfollowResult.rows[0] };
      } else {
        // User is not following, so follow
        const followResult = await db.query(followQuery, [
          selfUserId,
          targetUsername,
        ]);
        return { status: "followed", ...followResult.rows[0] };
      }
    } catch (error) {
      throw new Error("Error toggling follow status");
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
      return rows;
    } catch (error) {
      throw new Error("User Not found");
    }
  }
}

export default UserModel;
