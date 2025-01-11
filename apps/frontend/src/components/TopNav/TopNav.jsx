import { Link } from "react-router-dom";
import InstagramLogo from "../../../src/assets/logo/instagram.png";
import SearchLogo from "../../../src/assets/navlogo/search.png";

const TopNav = () => {
  return (
    <>
      <div className="w-full h-auto mb-5 lg:hidden md:hidden sm:block block">
        <div className="w-full h-auto flex items-center justify-between">
          <Link to="/">
            <img
              src={InstagramLogo}
              alt="insta logo"
              className="w-28 h-auto object-contain"
            />
          </Link>
          <div className="flex items-center gap-x-4 pe-2">
            <Link to="/search">
              <img src={SearchLogo} alt="Search icn" className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNav;
