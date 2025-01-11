import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { pb } from "./pocketbase";

export const useMutateDeleteCommunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ communityId }: { communityId: string }) => {
      await pb.collection("all_communities").delete(communityId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        "all_communities" as InvalidateQueryFilters
      );
    },
  });
};
