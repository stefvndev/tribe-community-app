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
