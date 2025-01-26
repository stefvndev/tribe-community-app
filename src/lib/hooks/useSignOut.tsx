import { useNavigate } from "@tanstack/react-router";
import { pb } from "@/api/pocketbase";
import Cookies from "js-cookie";

const useSignOut = () => {
  const navigate = useNavigate();

  const signOut = () => {
    pb.authStore.clear();
    Cookies.remove("userId");
    navigate({ to: "/login" });
  };

  return { signOut };
};

export default useSignOut;
