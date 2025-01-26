import { useNavigate } from "@tanstack/react-router";
import { pb } from "@/api/pocketbase";
import Cookies from "js-cookie";
import useUserStore from "@/store/UserStore";

const useSignOut = () => {
  const navigate = useNavigate();
  const { setUserId } = useUserStore();

  const signOut = () => {
    pb.authStore.clear();
    Cookies.remove("userId");
    navigate({ to: "/login" });
    setUserId(undefined);
  };

  return { signOut };
};

export default useSignOut;
