import { create } from "zustand";

interface UserStore {
  userId?: string;
  setUserId: (user?: string) => void;
  clearUserId: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  userId: undefined,
  setUserId: (userId) => set({ userId }),
  clearUserId: () => set({ userId: undefined }),
}));

export default useUserStore;
