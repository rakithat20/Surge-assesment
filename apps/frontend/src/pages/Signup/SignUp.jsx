import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/logo/instaaa.png";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleGoogleSignIn = () => {
    window.location.href = "/api/auth/google";
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.username.trim()) {
      newErrors.username = "username is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "/api/auth/register",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (!response.status === 200) {
        throw new Error("Signup failed");
      }
      navigate("/");
      console.log("Signup successful!");
    } catch (error) {
      console.log(error);
      setErrors((prev) => ({
        ...prev,
        submit: "Failed to sign up. Please try again.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 text-white">
      <div className="w-full max-w-sm bg-black border border-white/30 rounded-sm p-8">
        <div className="flex justify-center mb-8">
          <Link to="/">
            <img
              src={logo}
              alt="Instagram Logo"
              className="h-16 w-auto object-contain"
            />
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
          <div className="space-y-1">
            <input
              type="text"
              className="w-full px-4 py-2 bg-black border border-white rounded-md
                       text-white placeholder-gray-400 focus:outline-none focus:ring-2
                       focus:ring-white focus:border-transparent"
              id="fullName"
              placeholder="Full name"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName}</p>
            )}
          </div>

          <div className="space-y-1">
            <input
              type="text"
              className="w-full px-4 py-2 bg-black border border-white rounded-md
                       text-white placeholder-gray-400 focus:outline-none focus:ring-2
                       focus:ring-white focus:border-transparent"
              id="username"
              placeholder="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>

          <div className="space-y-1">
            <input
              type="email"
              className="w-full px-4 py-2 bg-black border border-white rounded-md
                       text-white placeholder-gray-400 focus:outline-none focus:ring-2
                       focus:ring-white focus:border-transparent"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="space-y-1">
            <input
              type="password"
              className="w-full px-4 py-2 bg-black border border-white rounded-md
                       text-white placeholder-gray-400 focus:outline-none focus:ring-2
                       focus:ring-white focus:border-transparent"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {errors.submit && (
            <p className="text-red-500 text-sm text-center">{errors.submit}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 py-2 rounded-md text-white hover:bg-blue-600
                     transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-black py-2 mt-4 rounded-md border text-white hover:border-green-300 transition-colors flex gap-2 justify-center"
        >
          Sign in with{" "}
          <span>
            <FcGoogle className="py-1 h-7 w-auto" />{" "}
          </span>
        </button>
        <div className="mt-6 text-center">
          <span className="text-gray-400">Already have an account? </span>
          <Link to="/login" className="text-blue-500 hover:text-blue-400">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
