/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Ellipse from "../../assets/Icons/Ellipse/Ellipse.jsx";
import Like from "../../assets/Icons/Like/Like.jsx";
import Liked from "../../assets/Icons/Like/Liked.jsx";
import { useState } from "react";
import axios from "axios";

const SinglePost = ({ post }) => {
  const [likes, updateLikes] = useState(parseInt(post.likes_count));
  const [isLiked, setIsLiked] = useState(post.is_liked);
  const handleLike = async () => {
    const res = await axios.post(`/api/post/${post.id}/like`);
    if (res.status == 200) {
      isLiked ? updateLikes(likes - 1) : updateLikes(likes + 1);
      setIsLiked(!isLiked);
    }
    return;
  };
  const timeAgo = (time) => {
    const now = new Date();
    const past = new Date(time);
    const diffInMs = now - past; // Difference in milliseconds
    const diffInSeconds = Math.floor(diffInMs / 1000); // Difference in seconds

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
    <div className="w-full h-auto mb-6" key={post.id}>
      {/* Profile Picture, Username, and Time */}
      <div className="w-full h-auto flex justify-between items-center mb-2">
        <div className="flex items-center gap-x-2">
          <Link className="flex items-center justify-center flex-col flex-shrink-0">
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
        <Ellipse />
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

      {/* Comment Count */}
      <div className="w-full h-auto flex items-center gap-x-1 mr-1">
        <div className="w-full h-auto text-sm text-gray-200 font-thin">
          <Link to="/" className="text-gray-400 font-normal my-2">
            view all {post.commentCount} comments
          </Link>
        </div>
      </div>
      <p className="text-gray-500 text-sm font-normal">
        {timeAgo(post.created_at)}
      </p>
    </div>
  );
};

export default SinglePost;
