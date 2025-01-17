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

export const useMutateLeaveCommunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      communityId,
      newMembers,
    }: {
      communityId: string;
      newMembers: string[];
    }) => {
      await pb.collection("all_communities").update(communityId, {
        members: newMembers,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        "all_communities" as InvalidateQueryFilters
      );
    },
  });
};

export const useMutateUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      formData,
      userId,
    }: {
      formData:
        | FormData
        | { oldPassword: string; password: string; passwordConfirm: string };
      userId?: string;
    }) => {
      const response = await pb
        .collection("users")
        .update(userId as string, formData);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user_data"] as InvalidateQueryFilters);
    },
  });
};

export const useMutateRemoveUserFromCommunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      communityId,
      updatedMembers,
    }: {
      communityId: string;
      updatedMembers: string[];
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
