import { create } from "zustand";
import { TCommunities } from "@/types/types";

type TCommunitiesState = {
  data: TCommunities | undefined;
  setData: (posts: TCommunities | undefined) => void;
  isLoading: boolean;
  isError: boolean;
  setLoading: (isLoading: boolean) => void;
  setError: (isError: boolean) => void;
};

const useCommunityStore = create<TCommunitiesState>((set) => ({
  data: undefined,
  setData: (data) => set({ data }),
  isLoading: false,
  isError: false,
  setLoading: (isLoading) => set({ isLoading }),
  setError: (isError) => set({ isError }),
}));

export default useCommunityStore;
