import Feedcard from "../../components/Feed/Feed.jsx";
import RightNav from "../../components/RightNav/RightNav";
// import Stories from "../../components/Stories/Stories";
import TopNav from "../../components/TopNav/TopNav";
const Feed = () => {
  return (
    <div className="lg:w-[83%] md:w-[83%] sm:w-full w-full min-h-screen lg:py-7 md:py-7 sm:py-4 py-3 px-3 flex items-start gap-x-20">
      {/*Feed and story section*/}
      <div className="lg:w-[55%] md:w-full sm:w-full w-full h-auto relative">
        {/*top nav bar for small screen */}
        <TopNav />
        {/*Story section*/}
        {/* <Stories /> */}
        {/*Feed section*/}

        <div className="w-full h-auto flex items-center justify-center mt-6">
          <div className="lg:w-[73%] md:w-[73%] sm:w-[80%] w-[80%] h-auto">
            <Feedcard />
          </div>
        </div>
      </div>

      {/*Recomended user sec*/}
      <div className="w- h-auto lg:block md:hidden sm:hidden hidden">
        <RightNav />
      </div>
    </div>
  );
};

export default Feed;
