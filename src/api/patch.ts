import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { pb } from "./pocketbase";

export const useMutateJoinCommunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      updatedMembers,
      communityId,
    }: {
      updatedMembers: string[];
      communityId: string;
    }) => {
      await pb.collection("all_communities").update(communityId, {
        members: updatedMembers,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("community_data" as InvalidateQueryFilters);
    },
  });
};
