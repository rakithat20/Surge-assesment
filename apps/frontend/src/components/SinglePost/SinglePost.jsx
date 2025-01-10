/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Ellipse from "../../assets/Icons/Ellipse/Ellipse.jsx";
import Like from "../../assets/Icons/Like/Like.jsx";
import Comment from "../../assets/Icons/Comment/Comment.jsx";
import Share from "../../assets/Icons/Share/Share.jsx";
import Save from "../../assets/Icons/Save/Save.jsx";

const SinglePost = ({ post }) => {
  return (
    <div className="w-full h-auto mb-6" key={post.id}>
      {/* Profile Picture, Username, and Time */}
      <div className="w-full h-auto flex justify-between items-center mb-2">
        <div className="flex items-center gap-x-2">
          <Link className="flex items-center justify-center flex-col flex-shrink-0">
            <div className="w-10 h-10 rounded-full object-cover p-[2px] bg-gradient-to-r from-[#f02aa6] to-[#ff6f48]">
              <img
                src={post.profileImg}
                alt={post.profileImg}
                className="rounded-full w-full h-full object-cover p-[2.5px] bg-black"
              />
            </div>
          </Link>
          <div className="flex items-center gap-x-2">
            <p className="text-white text-sm font-medium">{post.username}</p>
            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
            <p className="text-white text-sm font-medium">{post.time}</p>
          </div>
        </div>
        <Ellipse />
      </div>

      {/* Post Image */}
      <div className="w-full lg:max-h-[75vh] md:max-h-[70vh] sm:max-h-[65vh] max-h-[50vh] lg:h-[70vh] md:h-[60vh] sm:h-[50vh] h-[50vh] lg:min-h-[65vh] md:min-h-[55vh] sm-min-h-[50vh] min-h-[45vh] border border-gray-300 rounded overflow-hidden mb-3">
        <img
          src={post.postImg}
          alt={post.caption}
          className="w-full h-full rounded object-cover"
        />
      </div>

      {/* Like, Comment, Share, Save */}
      <div className="w-full h-auto flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          <Like />
          <Comment />
          <Share />
        </div>
        <Save />
      </div>

      {/* Like Count */}
      <Link
        to="/"
        className="w-full h-auto flex items-center gap-x-2 text-base text-gray-200 font-medium my-2"
      >
        {post.likeCount} likes
      </Link>

      {/* Caption */}
      <div className="w-full h-auto flex items-center gap-x-1">
        <div className="w-full h-auto text-sm text-gray-200 font-thin">
          <Link
            to={`/profile/${post.username}`}
            className="text-white font-medium my-2 pr-1"
          >
            {post.username}
          </Link>
          <span className="text-gray-400 font-normal my-2">{post.caption}</span>
        </div>
      </div>

      {/* Comment Count */}
      <div className="w-full h-auto flex items-center gap-x-1">
        <div className="w-full h-auto text-sm text-gray-200 font-thin">
          <Link to="/" className="text-gray-400 font-normal my-2">
            view all {post.commentCount} comments
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
