import SearchLogo from "../../../src/assets/navlogo/search.png";
import ExploreLogo from "../../../src/assets/navlogo/explore.png";
import ReelsLogo from "../../../src/assets/navlogo/reel.png";
import HomeLogo from "../../../src/assets/navlogo/home.png";
import NotificationsLogo from "../../../src/assets/navlogo/like.png";
import CreateLogo from "../../../src/assets/navlogo/create.png";
import InstagramLogo from "../../../src/assets/logo/instagram.png";
import InstagramIcon from "../../../src/assets/logo/icon.png";

import { Link } from "react-router-dom";

const LargeNav = () => {
  const sidebarItems = [
    {
      name: "Search",
      link: "/search",
      icon: SearchLogo,
    },
    {
      name: "Explore",
      link: "/explore",
      icon: ExploreLogo,
    },
    {
      name: "Reels",
      link: "/reels",
      icon: ReelsLogo,
    },
    {
      name: "Notifications",
      link: "/notifications",
      icon: NotificationsLogo,
    },
    {
      name: "Create",
      link: "/create",
      icon: CreateLogo,
    },
  ];
  return (
    <div className="w-full h-full relative ">
      <Link to="/" className="mb-10 px-2 lg:block md:hidden sm:hidden hidden">
        <img
          src={InstagramLogo}
          alt="instagram logo"
          className="img w-28 h-auto"
        ></img>
      </Link>
      <Link to="/" className="mb-10 px-2 lg:hidden md:block sm:block block">
        <img
          src={InstagramIcon}
          alt="instagram logo"
          className="img w-10 h-auto"
        ></img>
      </Link>
      <div className="w-full h-auto flex items-start flex-col gap-y-2">
        <Link
          to="/"
          className="w=full h-auto flex items-center gap-x-4 p-3 bg-transparent hover:bg-gray-800/60 rounded-md
             ease-out duration-500 group"
        >
          <img
            src={HomeLogo}
            alt="Home icon"
            className="w-6 h-6 object-contain group-hover:scale-105 ease-out duration-300"
          />
          <p className="text-base font-semibold text-white lg:block md:hidden sm:hidden">
            Home
          </p>
        </Link>
        {sidebarItems.map((item) => (
          <Link
            key={item.name}
            to={item.link}
            className="w=full h-auto flex items-center gap-x-4 p-3 bg-transparent hover:bg-gray-800/60 rounded-md
                ease-out duration-500 group"
          >
            <img
              src={item.icon}
              alt="Home icon"
              className="w-6 h-6 object-contain group-hover:scale-105 ease-out duration-300"
            />
            <p className="text-base font-semibold text-white lg:block md:hidden sm:hidden ">
              {item.name}
            </p>
          </Link>
        ))}
        <Link
          to="/profile"
          className="w=full h-auto flex items-center gap-x-4 p-3 bg-transparent hover:bg-gray-800/60 rounded-md
                ease-out duration-500 group"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBBSFEB9Aq8f79o35ql5gbX4Y48oiWwBhYKg&s"
            alt="profile icon"
            className="w-6 h-6 rounded-xl object-cover group-hover:scale-105 ease-out duration-300"
          />

          {/*need to fill from the backend*/}
          <p className="text-base font-semibold text-white lg:block md:hidden sm:hidden ">
            Profile
          </p>
        </Link>
        <Link
          className="w=full h-auto flex items-center gap-x-4 p-3 bg-transparent hover:bg-red-500 rounded-md
                ease-out duration-500"
        >
          <p className="text-white">Log Out</p>
        </Link>
      </div>
    </div>
  );
};

export default LargeNav;
