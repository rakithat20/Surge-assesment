import { useParams } from "react-router-dom";
import SinglePostCard from "../../components/SinglePost/SinglePost";
import axios from "axios";
import { useEffect, useState } from "react";

const SinglePost = () => {
  // Extract the postId from the URL
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `http://localhost:3000/api/post/${postId}`,
        {
          withCredentials: true,
        }
      );
      setPost(response.data[0]);
    }
    fetchData();
  }, [postId]);
  if (!post) {
    return <p className="text-white text-center">Post not found.</p>;
  }
  console.log(post);

  return (
    <div className="w-full h-auto p-4">
      <SinglePostCard post={post} />
    </div>
  );
};

export default SinglePost;
