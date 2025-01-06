import { TCommunities } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import PocketBase from "pocketbase";

export const pb = new PocketBase(import.meta.env.VITE_API_BASE_URL);

export const useCommunityData = (id: string) => {
  return useQuery({
    queryKey: ["community_data"],
    queryFn: async () => {
      const data: TCommunities = await pb
        .collection("all_communities")
        .getOne(id);
      return data;
    },
    retry: 0,
  });
};

export const useListOfAllCommunities = () => {
  return useQuery({
    queryKey: ["all_communities"],
    queryFn: async () => {
      const data: TCommunities[] = await pb
        .collection("all_communities")
        .getFullList();
      return data;
    },
  });
};
