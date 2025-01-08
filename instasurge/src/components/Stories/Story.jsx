/* eslint-disable react/prop-types */
const Story = ({ data }) => {
  const genUsername =
    data.username.length > 8
      ? `${data.username.slice(0, 7)}...`
      : data.username;
  return (
    <div className="flex flex-col text-center">
      <div
        key={data.id}
        className="w-16 h-16 rounded-full object-cover p-[2px] bg-gradient-to-r from-[#f02aa6] to-[#ff6f48]"
      >
        <img
          src={data.imageUrl}
          alt={data.username}
          className="rounded-full w-full h-full object-cover p-[2.5px] bg-black"
        />
      </div>
      <p className="text-white text-sm mt-1 truncate">{genUsername}</p>
    </div>
  );
};

export default Story;
