import { Link } from "react-router-dom";
import Tab from "../../Tab/Tab";
import Post from "../../Post/Post";
const MobileProfile = () => {
  return (
    <>
      <div className="w-full h-auto lg:hidden md:hidden sm:block xsm:block hidden text-white">
        <div className="w-full h-auto flex  gap-x-8 justify-start mb-3">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBBSFEB9Aq8f79o35ql5gbX4Y48oiWwBhYKg&s"
            alt="profile pic"
            className="rounded-full  w-20 h-20 object-cover"
          />
          <div className="flex items-start flex-col gap-y-3">
            <Link to="/profile" className="text-lg text-gray-200 font-normal">
              Wtf
            </Link>
            <div className="flex items-center gap-x-2">
              <button className="bg-[#1d1d1d] rounded lg:px-4 py-1 text-base text-white font-me hover:bg-[#2f2f2f] ease-out duration-150">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        <p className="text-base font-medium text-gray-200">Linus tech tips</p>
        <p className="text-base font-normal text-gray-200 mt-2">
          NIBM 🎓
          <br />
          02|🇱🇰
        </p>
        <div className="w-full h-auto flex items-center justify-around border-t border-t-[#1d1d1d] mt-3">
          <div className="flex items-center flex-col py-3">
            <h6 className="text-base text-white font-medium mb-0">23</h6>
            <p className="text-sm text-white font-thin"> posts</p>
          </div>
          <div className="flex items-center flex-col py-3">
            <h6 className="text-base text-white font-medium mb-0">222</h6>
            <p className="text-sm text-white font-thin"> followers</p>
          </div>
          <div className="flex items-center flex-col py-3">
            <h6 className="text-base text-white font-medium mb-0">214</h6>
            <p className="text-sm text-white font-thin"> following</p>
          </div>
        </div>
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

export default MobileProfile;
