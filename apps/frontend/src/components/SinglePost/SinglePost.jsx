/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Ellipse from "../../assets/Icons/Ellipse/Ellipse.jsx";
import Like from "../../assets/Icons/Like/Like.jsx";
import Liked from "../../assets/Icons/Like/Liked.jsx";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/Authcontext.jsx";

const SinglePost = ({ post }) => {
  const { user, loading } = useContext(AuthContext);
  const [likes, updateLikes] = useState(parseInt(post.likes_count));
  const [isLiked, setIsLiked] = useState(post.is_liked);
  const [showDelete, setShowDelete] = useState(false); // State to show delete button
  const [canDelete, setCanDelete] = useState(false);

  useEffect(() => {
    if (user.id === post.user_id) {
      setCanDelete(true);
    }
  }, [user.id, post.user_id]);

  if (loading) {
    return;
  }
  const handleLike = async () => {
    const res = await axios.post(`/api/post/${post.id}/like`);
    if (res.status == 200) {
      isLiked ? updateLikes(likes - 1) : updateLikes(likes + 1);
      setIsLiked(!isLiked);
    }
    return;
  };

  const handleDelete = async () => {
    const res = await axios.delete(`/api/post/${post.id}`);
    if (res.status === 200) {
      alert("Post deleted successfully");
      window.location("/");
    }
  };

  const timeAgo = (time) => {
    const now = new Date();
    const past = new Date(time);
    const diffInMs = now - past;
    const diffInSeconds = Math.floor(diffInMs / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds}s ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays}d ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths}mo ago`;
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears}y ago`;
  };

  return (
    <div className="w-full h-auto mb-8" key={post.id}>
      {/* Profile Picture, Username, and Time */}
      <div className="w-full h-auto flex justify-between items-center mb-2">
        <div className="flex items-center gap-x-2">
          <Link
            className="flex items-center justify-center flex-col flex-shrink-0"
            to={`/profile/${post.user_username}`}
          >
            <div className="w-10 h-10 rounded-full object-cover p-[2px] bg-gray-600">
              <img
                src={post.user_avatar_url}
                alt={post.user_avatar_url}
                className="rounded-full w-full h-full object-cover p-[2.5px] bg-black"
              />
            </div>
          </Link>
          <div className="flex items-center gap-x-2">
            <p className="text-white text-sm font-medium">
              {post.user_username}
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowDelete(!showDelete)}
          disabled={!canDelete}
        >
          <Ellipse />
        </button>
      </div>

      {/* Post Image */}
      <div className="w-full lg:max-h-[75vh] md:max-h-[70vh] sm:max-h-[65vh] max-h-[50vh] lg:h-[70vh] md:h-[60vh] sm:h-[50vh] h-[50vh] lg:min-h-[65vh] md:min-h-[55vh] sm-min-h-[50vh] min-h-[45vh] border border-gray-300 rounded overflow-hidden mb-3">
        <img
          src={post.image_url}
          alt={post.caption}
          className="w-full h-full rounded object-cover"
        />
      </div>

      {/* Like, Comment, Share, Save */}
      <div className="w-full h-auto flex items-center justify-between text-white font-medium">
        <div className="flex items-center gap-x-3 w-5" onClick={handleLike}>
          {isLiked ? <Liked /> : <Like />}
        </div>
        <p> {post.user_username}</p>
        <p> {timeAgo(post.created_at)}</p>
      </div>

      {/* Like Count */}
      <Link
        to="/"
        className="w-full h-auto flex items-center gap-x-2 text-base text-gray-200 font-medium my-2"
      >
        {likes} likes
      </Link>

      {/* Caption */}
      <div className="w-full h-auto flex items-center gap-x-1">
        <div className="w-full h-auto text-sm text-gray-200 font-thin">
          <Link
            to={`/profile/${post.user_username}`}
            className="text-white font-medium my-2"
          >
            {post.username}
          </Link>
          <span className="text-gray-400 font-normal my-2 ">
            {post.caption}
          </span>
        </div>
      </div>

      {/* Delete Button (only visible when showDelete is true) */}
      {showDelete && (
        <div className="mt-2">
          <button onClick={handleDelete} className="text-red-500 font-medium">
            Delete Post
          </button>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
