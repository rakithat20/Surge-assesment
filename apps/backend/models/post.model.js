import db from "../config/db.config.js";

class PostModel {
  // Get all posts
  async getAllPosts() {
    const query = `
      SELECT p.*, 
       u.email AS user_email, 
       u.avatar_url AS user_avatar_url, 
       u.username AS user_username, 
       COUNT(l.id) AS likes_count 
FROM posts p 
JOIN users u ON p.user_id = u.id 
LEFT JOIN likes l ON p.id = l.post_id 
GROUP BY p.id, u.email, u.avatar_url, u.username 
ORDER BY p.created_at ASC;

    `;
    const { rows } = await db.query(query);
    return rows;
  }
  // Get post by id
  async getPost(id) {
    const query = `
      SELECT p.*, 
       u.email AS user_email, 
       u.avatar_url AS user_avatar_url, 
       u.username AS user_username, 
       COUNT(l.id) AS likes_count 
FROM posts p 
JOIN users u ON p.user_id = u.id 
LEFT JOIN likes l ON p.id = l.post_id 
WHERE p.id = $1
GROUP BY p.id, u.email, u.avatar_url, u.username 
ORDER BY p.created_at ASC;

    `;
    const { rows } = await db.query(query, [id]);
    return rows;
  }

  // Create a post
  async createPost(userId, caption, imageUrl) {
    const query = `
      INSERT INTO posts (user_id, caption, image_url) 
      VALUES ($1, $2, $3) 
      RETURNING *;
    `;
    const values = [userId, caption, imageUrl];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  // Like/unlike a post
  async toggleLike(userId, postId) {
    const existingLikeQuery =
      "SELECT * FROM likes WHERE user_id = $1 AND post_id = $2";
    const { rows } = await db.query(existingLikeQuery, [userId, postId]);

    if (rows.length > 0) {
      // Unlike
      const deleteQuery =
        "DELETE FROM likes WHERE user_id = $1 AND post_id = $2";
      await db.query(deleteQuery, [userId, postId]);
      return "unliked";
    } else {
      // Like
      const insertQuery =
        "INSERT INTO likes (user_id, post_id) VALUES ($1, $2)";
      await db.query(insertQuery, [userId, postId]);
      return "liked";
    }
  }
}

export default PostModel;
