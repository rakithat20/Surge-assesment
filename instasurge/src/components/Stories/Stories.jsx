import { Link } from "react-router-dom";
import Story from "./Story";
import storiesData from "../../data";
const Stories = () => {
  return (
    <>
      <div className="lg:max-w-[41vw] md:max-w-[70vw] sm:max-w-full max-w-full h-auto flex items-center gap-x-3.5 overflow-x-scroll ">
        <Link
          to="/"
          className="flex items-center justify-center flex-row flex-shrink-0 gap-3"
        >
          {storiesData.map((story) => (
            <Story key={story.id} data={story} />
          ))}
        </Link>
      </div>
    </>
  );
};

export default Stories;
