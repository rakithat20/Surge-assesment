import PostIcon from "../../../assets/Icons/Post/post.png";
const Tab = () => {
  return (
    <div className="text-white border-t-2 border-t-white flex items-center gap-x-1.5 -mt-[-1.5px] px-4 py-2 focus:outline-none transition ease-out duration-150">
      <img src={PostIcon} alt="post icon" className="w-[15px] h-[15 px]" />
      <h6 className="text-base font-normal">POSTS</h6>
    </div>
  );
};

export default Tab;
