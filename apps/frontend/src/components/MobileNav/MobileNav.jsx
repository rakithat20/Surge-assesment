import SearchLogo from "../../../src/assets/navlogo/search.png";
import ReelsLogo from "../../../src/assets/navlogo/reel.png";
import HomeLogo from "../../../src/assets/navlogo/home.png";
import CreateLogo from "../../../src/assets/navlogo/create.png";
import { Link } from "react-router-dom";

const MobileNav = () => {
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
    {
      name: "Reels",
      link: "/reels",
      icon: ReelsLogo,
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
                to='/profile'
                className="w=full h-auto flex items-center gap-x-4 p-3 bg-transparent rounded-md group">
                   <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBBSFEB9Aq8f79o35ql5gbX4Y48oiWwBhYKg&s' alt="profile icon" className="w-6 h-6 rounded-full object-cover group-hover:scale-105 ease-out duration-300" />
                  
                  
                   {/*need to fill from the backend*/}
               </Link>
      </div>
    </div>
  );
};

export default MobileNav;
