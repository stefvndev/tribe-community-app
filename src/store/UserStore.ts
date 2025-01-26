import { pb } from "@/api/pocketbase";
import { create } from "zustand";

interface UserStore {
  userId?: string;
  setUserId: (user?: string) => void;
  clearUserId: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  userId: pb.authStore.record?.id,
  setUserId: (userId) => set({ userId }),
  clearUserId: () => set({ userId: undefined }),
}));

export default useUserStore;
