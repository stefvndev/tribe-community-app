import { TCommunities, TUserData } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { pb } from "./pocketbase";

export const useGetUserData = (id: string) => {
  return useQuery({
    queryKey: ["user_data"],
    queryFn: async () => {
      const data: TUserData = await pb.collection("users").getOne(id);
      return data;
    },
  });
};

export const useCommunityData = (id: string) => {
  return useQuery({
    queryKey: ["community_data", id],
    queryFn: async () => {
      const data: TCommunities = await pb
        .collection("all_communities")
        .getOne(id, {
          expand: "createdBy",
        });
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
