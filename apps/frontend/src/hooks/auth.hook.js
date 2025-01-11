import { useContext } from "react";
import { AuthContext } from "../contexts/Authcontext";
// Custom hook to access authentication context
export const useAuth = () => {
  return useContext(AuthContext); // Return value from context
};
