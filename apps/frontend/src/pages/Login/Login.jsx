import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/logo/instaaa.png";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
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
        "/api/auth/login",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status !== 200) {
        throw new Error("Login failed");
      }

      navigate("/");
      console.log("Login successful!");
    } catch (error) {
      console.log(error);
      setErrors((prev) => ({
        ...prev,
        submit: "Failed to log in. Please try again.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = "/api/auth/google";
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

        <form onSubmit={handleSubmit} className="space-y-8 p-8 flex flex-col">
          <div className="space-y-1">
            <input
              type="text"
              className="w-full px-4 py-2 bg-black border border-white rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              id="email"
              placeholder="Username or Email"
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
              className="w-full px-4 py-2 bg-black border border-white rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
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
            className="w-full bg-blue-500 py-2 rounded-md text-white hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Log in"}
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

        <div className="bottom-4 left-0 right-0 w-auto border-t border-white/30 flex items-center flex-col mt-4">
          <span className="font-thin text-sm pb-3">
            or{" "}
            <Link className="text-blue-500 font-medium" to="/register">
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
