import { useState, useRef } from "react";
import { useAuth } from "../../hooks/auth.hook";
import axios from "axios";

const EditProfile = () => {
  const { user, loading } = useAuth();
  const [profilePic, setProfilePic] = useState(user.avatar_url);
  const [isNew, setIsNew] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    username: user.username || "",
    full_name: user.full_name || "",
    bio: user.bio || "",
  });

  if (loading) {
    return null;
  }

  const handleProfilePic = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setIsNew(true);
    }
  };

  const resetProPic = (e) => {
    e.preventDefault();
    setProfilePic(user.avatar_url);
    setIsNew(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const formPayload = new FormData();
      formPayload.append("id", user.id);
      formPayload.append("username", formData.username);
      formPayload.append("bio", formData.bio);

      if (profilePic instanceof File) {
        formPayload.append("avatar", profilePic);
      }
      const response = await axios.patch("/api/user/profile", formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log("Profile updated successfully");
        setIsNew(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const previewUrl =
    profilePic instanceof File ? URL.createObjectURL(profilePic) : profilePic;

  return (
    <div className="text-white w-full h-full flex items-center justify-center overflow-auto">
      <form
        onSubmit={handleSubmit}
        className="border border-white/30 w-full max-w-4xl rounded-sm p-6"
      >
        <div className="w-full h-full">
          <div className="border-b border-white/20 pb-4 mb-4">
            <h2 className="font-medium text-xl mb-6">Profile Picture</h2>
            <div className="items-center flex">
              <div className="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center">
                <img
                  src={previewUrl}
                  alt="profile pic"
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>

              {isNew ? (
                <button
                  type="button"
                  className="ml-10 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md w-28 h-10 flex items-center justify-center cursor-pointer"
                  onClick={resetProPic}
                >
                  Reset
                </button>
              ) : (
                <label className="ml-10 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md w-28 h-10 flex items-center justify-center cursor-pointer">
                  <span>Select File</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleProfilePic}
                    accept="image/*"
                  />
                </label>
              )}
            </div>
          </div>

          <div className="border-b border-white/20 pb-4 mb-4">
            <h2 className="text-xl font-bold mb-2">Username</h2>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full bg-gray-950 border border-gray-700 rounded-lg p-3 text-white"
              placeholder={user.username}
            />
          </div>

          <div className="border-b border-white/20 pb-4 mb-4">
            <h2 className="text-xl font-bold mb-2">Full Name</h2>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
              className="w-full bg-gray-950 border border-gray-700 rounded-lg p-3 text-white"
              placeholder={user.full_name}
            />
          </div>

          <div className="border-b border-white/20 pb-4 mb-4">
            <h2 className="text-xl font-bold mb-2">Bio</h2>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className="w-full bg-gray-950 border border-gray-700 rounded-lg p-3 text-white"
              rows="4"
              placeholder={user.bio}
            />
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
