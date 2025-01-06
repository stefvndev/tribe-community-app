import { pb } from "@/api/pocketbase";

export const useLoggedState = () => {
  const isLogged = () => pb.authStore.isValid;

  return { isLogged };
};

export type AuthContext = ReturnType<typeof useLoggedState>;
