import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/auth.hook";
import Spinner from "../Spinner/Spinner";
const ProfileNav = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="w-full h-auto flex items-center justify-between">
        <Link
          to={`profile/${user.username}`}
          className="w-full h-auto flex items-center gap-x-2"
        >
          <img
            src={user.avatar_url}
            alt="profile"
            className="w-12 h-12 rounded-full object-contain"
          />
          <div className="flex items-start gap-y-0 flex-col">
            <p className="text-[0.9rem] text-white font-medium mb-0">
              {user.username}
            </p>
            <h6 className="text- text-gray-500 font-normal">
              {user.full_name}
            </h6>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProfileNav;
