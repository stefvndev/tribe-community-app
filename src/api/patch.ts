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

export const useMutateUpdateLikes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      updatedLikes,
      postId,
    }: {
      updatedLikes: string[];
      postId: string;
    }) => {
      await pb.collection("posts").update(postId, {
        likes: updatedLikes,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("all_posts" as InvalidateQueryFilters);
    },
  });
};
