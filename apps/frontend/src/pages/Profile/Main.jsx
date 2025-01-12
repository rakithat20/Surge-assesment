import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/auth.hook";
import MobileProfile from "./Profile/Mobile/MobileProfile";
import Profile from "./Profile/Profile.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner/Spinner.jsx";

const Main = () => {
  const { user, loading } = useAuth(); // Destructure the object instead of array
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const { username } = useParams();
  useEffect(() => {
    const fetchUserData = async () => {
      if (!username) return;

      try {
        const res = await axios.get(`/api/user/profile/${username}`, {
          withCredentials: true,
        });
        setUserData(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching user data", error);
        setError(error.message);
      }
    };

    fetchUserData();
  }, [username]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div>
          <Spinner />
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div>Error loading profile: {error}</div>
      </div>
    );
  }

  return (
    <div className="lg:w-md:w- sm:w-full w-full min-h-screen lg:py-10 md:py-6 sm:py-4 py-4 lg:px-14 md:px-12 sm:px-7 px-4">
      {userData ? (
        <>
          <div className="lg:block md:block sm:hidden hidden">
            <Profile userData={userData} />
          </div>
          <div className="lg:hidden md:hidden sm:block block">
            <MobileProfile userData={userData} />
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default Main;
