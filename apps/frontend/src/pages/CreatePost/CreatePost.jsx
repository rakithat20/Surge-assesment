import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    caption: "",
    image: null,
  });
  const [isLoading, setLoading] = useState(false);

  const [redirectTo, setRedirectTo] = useState(null); // State for redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(isLoading);
    setLoading(true);
    console.log(isLoading);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("caption", formData.caption);
      formDataToSend.append("image", formData.image);

      const res = await axios.post("/api/post/", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log(res);
      setLoading(false);
      setFormData({ caption: "", image: null });
      if (res.status === 200) {
        setRedirectTo(`/post/${res.data.id}`);
        window.location(redirectTo);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    }
  };
  return (
    <div className="w-full max-w-lg bg-black p-6 rounded-lg shadow-md text-white mt-40 border border-gray-300 lg:mr-96 mx-auto">
      <h2 className="text-xl font-medium mb-4">Create a New Post</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Caption Input */}
        <div className="mb-4">
          <label htmlFor="caption" className="block text-sm font-medium mb-1">
            Caption
          </label>
          <textarea
            id="caption"
            name="caption"
            value={formData.caption}
            onChange={handleChange}
            placeholder="Write your caption here..."
            className="w-full h-16 p-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image Input */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium mb-1">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 rounded-lg hover:bg-blue-700 transition-all text-white font-medium disabled:bg-gray-600"
          disabled={isLoading}
        >
          Create Post
        </button>
      </form>

      {/* Back to Posts Link */}
      <div className="mt-4">
        <Link
          to="/"
          className="text-blue-400 hover:underline text-sm font-medium"
        >
          Back to Posts
        </Link>
      </div>
    </div>
  );
};

export default CreatePost;
