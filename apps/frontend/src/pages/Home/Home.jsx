import { Route, Routes, useNavigate } from "react-router-dom";
import LargeNav from "../../components/LargeNav/LargeNav";
import MobileNav from "../../components/MobileNav/MobileNav";
import Feed from "../Feed/Feed";
import Main from "../Profile/Main";
import SinglePost from "../SinglePost/SinglePost";
import { useAuth } from "../../hooks/auth.hook";
import Search from "../Search/Search";
import CreatePost from "../CreatePost/CreatePost";
const Home = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (!user) {
    navigate("/login");
  }
  return (
    <>
      <div className="w-full h-auto flex items-start justify-between lg:gap-x-32 md:gap-x-16 sm:gap-x-8 gap-x-4 relative">
        {/*sidebar  */}
        <div className="lg:w[16%] md:w[17%] sm:w-none w-none h-[100vh] pt-10 pl-3 pr-24 border-r border-r-gray-500 sticky top-0 left-0 lg:block md:block sm:hidden hidden">
          <LargeNav />
        </div>
        {/*Bottom navbar for small screen */}
        <div className="w-full h-auto py-1 px-3 border-t border-t-[#1d1d1d] fixed bottom-0 left-0 lg:hidden md:hidden sm:block block bg-black z-50">
          <MobileNav />
        </div>
        {/*Feed and profile routing section*/}
        <Routes>
          <Route exact path="/" element={<Feed />} />
          {/* <Route exact path="/profile" element={<Main />} /> */}
          <Route path="/post/:postId" element={<SinglePost />} />
          <Route exact path="/search" element={<Search />} />
          <Route path="/profile/:username" element={<Main />} />
          <Route path="create" element={<CreatePost />} />
        </Routes>
      </div>
    </>
  );
};

export default Home;
