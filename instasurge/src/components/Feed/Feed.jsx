import instagramFeed from "../FeedData/FeedData.jsx";
import SinglePost from "../SinglePost/SinglePost.jsx";

const Feed = () => {
  return (
    <>
      {instagramFeed.map((post) => (
        <SinglePost post={post} key={post.id} />
      ))}
    </>
  );
};

export default Feed;
