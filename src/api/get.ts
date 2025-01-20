import {
  TCommunities,
  TConversation,
  TMessage,
  TPost,
  TUserData,
} from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { pb } from "./pocketbase";

export const useGetUserData = (id: string) => {
  return useQuery({
    queryKey: ["user_data", id],
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
          expand: "createdBy, members",
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

export const useListOfAllPosts = (id: string) => {
  return useQuery({
    queryKey: ["all_posts", id],
    queryFn: async () => {
      const data: TPost[] = await pb.collection("posts").getFullList({
        sort: "-created",
        filter: `community="${id}"`,
        expand: "user, comments",
      });
      return data;
    },
  });
};

export const useGetSelectedPost = (id: string) => {
  return useQuery({
    queryKey: ["selected_post", id],
    queryFn: async () => {
      const data: TPost = await pb.collection("posts").getOne(id, {
        expand: "user",
      });
      return data;
    },
  });
};

export const useListOfAllCommentsForSelectedPost = (post_id?: string) => {
  return useQuery({
    queryKey: ["selected_post_comments", post_id],
    queryFn: async () => {
      if (!post_id) return null;
      const data: TPost[] = await pb.collection("comments").getFullList({
        sort: "-created",
        filter: `post="${post_id}"`,
        expand: "user",
      });
      return data;
    },
  });
};

export const useListOfAllComments = () => {
  return useQuery({
    queryKey: ["all_comments"],
    queryFn: async () => {
      const data: TPost[] = await pb.collection("comments").getFullList();
      return data;
    },
  });
};

export const useConversationsData = (userId: string) => {
  return useQuery({
    queryKey: ["all_conversations", userId],
    queryFn: async () => {
      const data: TConversation[] = await pb
        .collection("conversations")
        .getFullList({
          filter: `users ~ "${userId}"`,
          sort: "-created",
          expand: "users, last_message",
        });
      return data;
    },
  });
};

export const useSelectedConversationData = (conversation_id: string) => {
  return useQuery({
    queryKey: ["selected_conversation", conversation_id],
    queryFn: async () => {
      const data: TMessage = await pb
        .collection("conversations")
        .getOne(conversation_id, {
          sort: "created",
          expand: "messages",
        });
      return data;
    },
  });
};
