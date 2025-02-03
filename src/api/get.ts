import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  TComment,
  TCommunities,
  TConversation,
  TMessage,
  TPost,
  TUserData,
} from "@/types/types";
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
    enabled: !!id,
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
    enabled: !!post_id,
  });
};

export const useListOfAllComments = () => {
  return useQuery({
    queryKey: ["all_comments"],
    queryFn: async () => {
      const data: TComment[] = await pb.collection("comments").getFullList();
      return data;
    },
  });
};

export const useConversationsData = (userId: string) => {
  return useQuery({
    queryKey: ["all_conversations"],
    queryFn: async () => {
      const data: TConversation[] = await pb
        .collection("conversations")
        .getFullList({
          filter: `users ~ "${userId}"`,
          sort: "-created",
          expand: "users, messages",
        });
      return data;
    },
    refetchInterval: 10000,
  });
};

export const useGetConversationMessages = (conversation_id: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["messages", conversation_id],
    queryFn: async () => {
      const data: TMessage[] = await pb.collection("messages").getFullList({
        filter: `conversation="${conversation_id}"`,
        expand: "sender_id",
      });

      return data;
    },
    enabled: !!conversation_id,
  });

  return { ...query, queryClient };
};

export const useSelectedConversationData = (
  conversation_id: string,
  userId: string
) => {
  return useQuery({
    queryKey: ["selected_conversation", conversation_id],
    queryFn: async () => {
      const data: TConversation = await pb
        .collection("conversations")
        .getOne(conversation_id, {
          sort: "-created",
          expand: "users",
        });

      const isUserAuthorized = data?.users?.includes(userId);

      if (!isUserAuthorized) {
        window.location.href = "/";
        return;
      }

      if (!isUserAuthorized) return null;

      return data;
    },
    enabled: !!conversation_id,
  });
};
