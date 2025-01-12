import { useContext } from "react";
import { AuthContext } from "../contexts/Authcontext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.error("authErr");
  }
  return context; // Returns { user, loading }
};
