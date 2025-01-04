import { useMemo } from "react";
import PocketBase from "pocketbase";

export const useLoggedState = () => {
  const pb = useMemo(
    () => new PocketBase(import.meta.env.VITE_API_BASE_URL),
    []
  );

  const isLogged = () => pb.authStore.isValid;

  return { isLogged };
};

export type AuthContext = ReturnType<typeof useLoggedState>;
