import { Link, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { useState } from "react";
import Post from "../Post/Post";
import Tab from "../Tab/Tab";
import { useAuth } from "../../../hooks/auth.hook";

const Profile = ({ userData }) => {
  const { user, loading } = useAuth();
  const [isFollowing, setIsFollowing] = useState(userData.is_following);
  const [followers, setfollowers] = useState(
    parseInt(userData.total_followers)
  );
  console.log(isFollowing);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!userData) {
    return <div>Error: No user data available</div>;
  }

  const handleFollow = async () => {
    try {
      const res = await axios.post(
        "/api/user/follow",
        { username: userData.username },
        {
          withCredentials: true,
        }
      );
      if (res.status == 200) {
        setIsFollowing(!isFollowing);
        isFollowing ? setfollowers(followers - 1) : setfollowers(followers + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="lg:w-[88%] md:w-[88%] sm:w-full w-full h-auto lg:block md:block sm:hidden hidden">
        {/* Info section */}
        <div className="w-full h-auto flex lg:gap-x-20 md:gap-x-16 sm:gap-x-12 gap-x-8 justify-center mb-10">
          <img
            src={userData.avatar_url}
            alt="profile pic"
            className="rounded-full lg:w-44 md:w-44 sm:w-36 w-32 lg:h-44 md:h-44 sm:h-36 h-32 object-cover"
          />
          <div className="flex items-start flex-col">
            <div className="flex items-center gap-x-5 mb-4">
              <Link
                to={`/profile/${userData.username}`}
                className="text-lg text-gray-200 font-normal"
              >
                {userData.username}
              </Link>
              <div className="flex items-center gap-x-2">
                {/* Conditional rendering of button */}
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
            {/* Post, followers, following */}
            <div className="flex items-center gap-x-6 mb-4">
              <div className="flex items-center flex-col">
                <h6 className="text-base text-gray-100 font-medium">
                  {userData.total_posts}{" "}
                  <span className="font-normal">posts</span>
                </h6>
              </div>
              <div className="flex items-center flex-col">
                <h6 className="text-base text-gray-100 font-medium">
                  {followers} <span className="font-normal">followers</span>
                </h6>
              </div>
              <div className="flex items-center flex-col">
                <h6 className="text-base text-gray-100 font-medium">
                  {userData.total_following}{" "}
                  <span className="font-normal">following</span>
                </h6>
              </div>
            </div>
            {/* Name and bio */}
            <p className="text-base font-medium text-gray-200">
              {userData.full_name}
            </p>
            <p className="text-base font-normal text-gray-200 mt-2">
              {userData.bio}
            </p>
          </div>
        </div>
        {/* Highlights section */}
        <div className="w-full h-auto flex items-center gap-x-9 mb-10">
          <br />
          <br />
          <br />
          <br />
        </div>
        {/* Posts Reels Tagged */}
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

Profile.propTypes = {
  userData: PropTypes.shape({
    avatar_url: PropTypes.string,
    username: PropTypes.string,
    total_posts: PropTypes.string,
    total_followers: PropTypes.string,
    total_following: PropTypes.string,
    full_name: PropTypes.string,
    bio: PropTypes.string,
    is_following: PropTypes.bool, // Added this prop
  }).isRequired,
};

export default Profile;
