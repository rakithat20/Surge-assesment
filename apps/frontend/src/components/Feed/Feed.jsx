import { useEffect, useState } from "react";
import SinglePost from "../SinglePost/SinglePost.jsx";
import axios from "axios";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/post/`, {
          withCredentials: true,
        });
        setPosts(response.data); // Assuming the API returns the posts in response.data
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      {posts.map((post) => (
        <SinglePost post={post} key={post.id} />
      ))}
    </>
  );
};

export default Feed;
