import { Link } from "react-router-dom";
const ProfileNav = () => {
  return (
    <>
      <div className="w-full h-auto flex items-center justify-between">
        <Link to="/profile" className="w-full h-auto flex items-center gap-x-2">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBBSFEB9Aq8f79o35ql5gbX4Y48oiWwBhYKg&s"
            alt="profile"
            className="w-12 h-12 rounded-full"
          />
          <div className="flex items-start gap-y-0 flex-col">
            <p className="text-[0.9rem] text-white font-medium mb-0">
              _linustechtips_
            </p>
            <h6 className="text- text-gray-500 font-normal">linus</h6>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProfileNav;
