import { pb } from "@/api/pocketbase";
import Cookies from "js-cookie";

export const useLoggedState = () => {
  const userId = Cookies.get("userId");
  const isLogged = () => pb.authStore.isValid && !!userId;

  return { isLogged };
};

export type AuthContext = ReturnType<typeof useLoggedState>;
