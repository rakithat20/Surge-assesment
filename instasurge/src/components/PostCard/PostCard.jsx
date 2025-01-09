/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Like from "../../assets/Icons/Like/liked.png";

const PostCard = ({ url, id, likes }) => {
  return (
    <Link
      id={id}
      to={`/post/${id}`}
      className="lg:w-[33%] md:w-[33%] sm:w-[32.5%] w-[32.5%] lg:h-[40vh] 
            md:h-[35vh] sm:h-[30vh] h-[25vh] "
      style={{
        backgroundImage: `url("${url}")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative w-full h-full group xsm:hidden sm:hidden lg:block block">
        <div className="w-full h-full bg-[#0000008c] gap-x-2 items-center justify-center lg:hidden md:hidden hidden group-hover:flex">
          <img src={Like} className="w-7" />{" "}
          <span className="text-white font-normal "> {likes}</span>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
