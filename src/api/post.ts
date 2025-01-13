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
    mutationFn: async ({
      content,
      title,
      user,
      community,
    }: {
      content: string;
      title: string;
      user: string;
      community: string;
    }) => {
      const response = await pb.collection("posts").create({
        content,
        title,
        user,
        community,
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("all_posts" as InvalidateQueryFilters);
    },
  });
};
