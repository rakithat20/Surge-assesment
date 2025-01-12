import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import PostCard from "../../../components/PostCard/PostCard";
import axios from "axios";

const Post = ({ username }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/user/${username}/posts`,
          {
            withCredentials: true,
          }
        );
        setPosts(res.data); // Assuming the posts are in the 'data' field of the response
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [username]); // Empty array ensures it runs once when the component mounts

  return (
    <>
      <div className="w-full h-auto flex items-center gap-1 flex-wrap">
        {posts.map((post) => (
          <PostCard
            key={post.post_id}
            url={post.image_url}
            id={post.post_id}
            likes={post.likes_count}
          />
        ))}
      </div>
    </>
  );
};
Post.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Post;
