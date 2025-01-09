import { Link } from "react-router-dom";
import Post from "../Post/Post";
import Tab from "../Tab/Tab";
const Profile = () => {
  return (
    <>
      <div className="lg:w-[88%] md:w-[88%] sm:w-full w-full h-auto lg:block md:block sm:hidden hidden">
        {/* Info section */}
        <div className="w-full h-auto flex lg:gap-x-20 md:gap-x-16 sm:gap-x-12 gap-x-8 justify-center mb-10">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBBSFEB9Aq8f79o35ql5gbX4Y48oiWwBhYKg&s"
            alt="profile pic"
            className="rounded-full lg:w-44 md:w-44 sm:w-36 w-32 lg:h-44 md-44 sm:h-36 h-32 object-cover"
          />
          <div className="flex items-start flex-col">
            <div className="flex items-center gap-x-5 mb-4">
              <Link to="/profile" className="text-lg text-gray-200 font-normal">
                Wtf
              </Link>
              <div className="flex items-center gap-x-2">
                <button className="bg-[#1d1d1d] rounded lg:px-4 py-1 text-base text-white font-me hover:bg-[#2f2f2f] ease-out duration-150">
                  Edit Profile
                </button>
              </div>
            </div>
            {/*post followers following*/}
            <div className="flex items-center gap-x-6 mb-4">
              <div className="flex items-center flex-col">
                <h6 className="text-base text-gray-100 font-medium">
                  10 <span className="font-normal">posts</span>
                </h6>
              </div>
              <div className="flex items-center flex-col">
                <h6 className="text-base text-gray-100 font-medium">
                  10 <span className="font-normal">followers</span>
                </h6>
              </div>
              <div className="flex items-center flex-col">
                <h6 className="text-base text-gray-100 font-medium">
                  10 <span className="font-normal">following</span>
                </h6>
              </div>
            </div>
            {/*name and bio*/}
            <p className="text-base font-medium text-gray-200">
              Linus tech tips
            </p>
            <p className="text-base font-normal text-gray-200 mt-2">
              NIBM 🎓
              <br />
              02|🇱🇰
            </p>
          </div>
        </div>
        {/*highlights section */}
        <div className="w-full h-auto flex items-center gap-x-9 mb-10">
          <br />
          <br />
          <br />
          <br />
        </div>
        {/*Posts Reels Tagged*/}
        <div className="w-full h-auto">
          <div className="w-full h-auto flex items-center justify-center gap-x-6 mb-4 border-t border-t-[#313131]">
            <Tab />
          </div>
        </div>
        <Post />
      </div>
    </>
  );
};

export default Profile;
