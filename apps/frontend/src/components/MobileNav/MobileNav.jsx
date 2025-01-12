import SearchLogo from "../../../src/assets/navlogo/search.png";
import HomeLogo from "../../../src/assets/navlogo/home.png";
import CreateLogo from "../../../src/assets/navlogo/create.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/auth.hook";
import Spinner from "../Spinner/Spinner";

const MobileNav = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return <Spinner />;
  }
  const sidebarItems = [
    {
      name: "Search",
      link: "/search",
      icon: SearchLogo,
    },
    {
      name: "Create",
      link: "/create",
      icon: CreateLogo,
    },
  ];

  return (
    <div className="w-full h-auto bg-black">
      <div className="w-full h-auto flex  items-center gap-x-4 py-3 justify-evenly">
        {/* Home Link */}
        <Link
          to="/"
          className="flex items-center gap-x-4 p-3 bg-transparent duration-500 group"
        >
          <img
            src={HomeLogo}
            alt="Home icon"
            className="w-6 h-6 object-contain group-hover:scale-105 ease-out duration-300"
          />
        </Link>

        {/* Sidebar Items */}
        {sidebarItems.map((item) => (
          <Link
            to={item.link}
            className="flex items-center gap-x-4 p-3 bg-transparent duration-500 group"
            key={item.name}
          >
            <img
              src={item.icon}
              alt={`${item.name} icon`}
              className="w-6 h-6 object-contain group-hover:scale-105 ease-out duration-300"
            />
          </Link>
        ))}
        <Link
          to={`profile/${user.username}`}
          className="w=full h-auto flex items-center gap-x-4 p-3 bg-transparent rounded-md group"
        >
          <img
            src={user.avatar_url}
            alt="profile icon"
            className="w-6 h-6 rounded-full object-cover group-hover:scale-105 ease-out duration-300"
          />

          {/*need to fill from the backend*/}
        </Link>
      </div>
    </div>
  );
};

export default MobileNav;
