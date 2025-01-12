import { Link, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Tab from "../../Tab/Tab";
import Post from "../../Post/Post";
import axios from "axios";
import { useAuth } from "../../../../hooks/auth.hook";
import { useState } from "react";

const MobileProfile = ({ userData }) => {
  const { user, loading } = useAuth();
  const [isFollowing, setIsFollowing] = useState(userData.is_following); // Assuming `is_following` is provided in `userData`.

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect if not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Ensure userData is provided
  if (!userData) {
    return <div>Error: No user data available</div>;
  }

  // Handle follow/unfollow action
  const handleFollow = async () => {
    try {
      if (isFollowing) {
        // Unfollow API call
        await axios.post(
          `http://localhost:3000/api/user/unfollow`,
          {
            username: userData.username,
          },
          { withCredentials: true }
        );
      } else {
        // Follow API call
        await axios.post(
          `http://localhost:3000/api/user/follow`,
          {
            username: userData.username,
          },
          { withCredentials: true }
        );
      }
      setIsFollowing(!isFollowing); // Toggle follow state
      window.location.reload();
    } catch (error) {
      console.error(
        "Error updating follow status:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      <div className="w-full h-auto lg:hidden md:hidden sm:block xsm:block hidden text-white">
        <div className="w-full h-auto flex gap-x-8 justify-start mb-3">
          <img
            src={userData.avatar_url}
            alt="profile pic"
            className="rounded-full w-20 h-20 object-cover"
          />
          <div className="flex items-start flex-col gap-y-3">
            <Link
              to={`/profile/${userData.username}`}
              className="text-lg text-gray-200 font-normal"
            >
              {userData.username}
            </Link>
            <div className="flex items-center gap-x-2">
              {user.username === userData.username ? (
                <button className="bg-[#1d1d1d] rounded lg:px-4 py-1 text-base text-white font-medium hover:bg-[#2f2f2f] ease-out duration-150">
                  Edit Profile
                </button>
              ) : (
                <button
                  onClick={handleFollow}
                  className={`rounded lg:px-4 py-1 text-base font-medium ease-out duration-150 ${
                    isFollowing
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>
          </div>
        </div>
        <p className="text-base font-medium text-gray-200">
          {userData.full_name}
        </p>
        <p className="text-base font-normal text-gray-200 mt-2">
          {userData.bio}
        </p>
        <div className="w-full h-auto flex items-center justify-around border-t border-t-[#1d1d1d] mt-3">
          <div className="flex items-center flex-col py-3">
            <h6 className="text-base text-white font-medium mb-0">
              {userData.total_posts}
            </h6>
            <p className="text-sm text-white font-thin">posts</p>
          </div>
          <div className="flex items-center flex-col py-3">
            <h6 className="text-base text-white font-medium mb-0">
              {userData.total_followers}
            </h6>
            <p className="text-sm text-white font-thin">followers</p>
          </div>
          <div className="flex items-center flex-col py-3">
            <h6 className="text-base text-white font-medium mb-0">
              {userData.total_following}
            </h6>
            <p className="text-sm text-white font-thin">following</p>
          </div>
        </div>
        <div className="w-full h-auto">
          <div className="w-full h-auto flex items-center justify-center gap-x-6 mb-4 border-t border-t-[#313131]">
            <Tab />
          </div>
        </div>
        <Post username={userData.username} />
      </div>
    </>
  );
};

MobileProfile.propTypes = {
  userData: PropTypes.shape({
    avatar_url: PropTypes.string,
    username: PropTypes.string,
    full_name: PropTypes.string,
    bio: PropTypes.string,
    total_posts: PropTypes.string, // Changed to number for consistency
    total_followers: PropTypes.string,
    total_following: PropTypes.string,
    is_following: PropTypes.bool, // Added this prop
  }).isRequired,
};

export default MobileProfile;
