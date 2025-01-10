import { useParams } from "react-router-dom";
import instagramFeed from "../../components/FeedData/FeedData";
import SinglePostCard from "../../components/SinglePost/SinglePost";

const SinglePost = () => {
  // Extract the postId from the URL
  const { postId } = useParams();

  // Find the specific post based on the postId
  const post = instagramFeed.find((item) => item.id === parseInt(postId));

  // Handle case where the post is not found
  if (!post) {
    return <p className="text-white text-center">Post not found.</p>;
  }

  return (
    <div className="w-full h-auto p-4">
      <SinglePostCard post={post} />
    </div>
  );
};

export default SinglePost;
