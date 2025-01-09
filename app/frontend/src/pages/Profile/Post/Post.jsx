import PostCard from "../../../components/PostCard/PostCard";
import posts from "./postdata";
const Post = () => {
  return (
    <>
      <div className="w-full h-auto flex items-center gap-1  flex-wrap">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            url={post.img}
            id={post.id}
            likes={post.likes}
          />
        ))}
      </div>
    </>
  );
};

export default Post;
