import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { pb } from "./pocketbase";

export const useMutateCreateCommunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ formData }: { formData: FormData }) => {
      const response = await pb.collection("all_communities").create(formData);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        "all_communities" as InvalidateQueryFilters
      );
    },
  });
};

export const useMutatePublishPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ formData }: { formData: FormData }) => {
      const response = await pb.collection("posts").create(formData);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("all_posts" as InvalidateQueryFilters);
    },
  });
};

export const useMutateCommentOnPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      formData,
    }: {
      formData: { content: string; post?: string; user?: string };
    }) => {
      const response = await pb.collection("comments").create(formData);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        "selected_post_comments" as InvalidateQueryFilters
      );
    },
  });
};
