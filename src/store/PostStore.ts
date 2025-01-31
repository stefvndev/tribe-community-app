import { TComment, TPost } from "@/types/types";
import { toast } from "sonner";
import { create } from "zustand";

type TPostState = {
  posts: TPost[];
  comments: TComment[];
  isLoading: boolean;
  isError: boolean;

  setPosts: (posts: TPost[]) => void;
  setComments: (comments: TComment[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (isError: boolean) => void;

  handleLikePost: (
    currentLikes: string[],
    postId: string,
    userId: string,
    mutateAsyncUpdateLikes: (args: {
      updatedLikes: string[];
      postId: string;
    }) => Promise<void>
  ) => Promise<void>;
  commentsLength: (
    post_id: string,
    allCommentsData: TComment[]
  ) => number | undefined;
};

const usePostStore = create<TPostState>((set) => ({
  posts: [],
  comments: [],
  isLoading: false,
  isError: false,

  setPosts: (posts) => set({ posts }),
  setComments: (comments) => set({ comments }),
  setError: (isError) => set({ isError }),
  setLoading: (isLoading) => set({ isLoading }),

  handleLikePost: async (
    currentLikes,
    postId,
    userId,
    mutateAsyncUpdateLikes
  ) => {
    const updatedLikes = currentLikes?.includes(userId)
      ? currentLikes?.filter((id) => id !== userId)
      : ([...currentLikes, userId] as string[]);

    try {
      await mutateAsyncUpdateLikes({ updatedLikes, postId });
    } catch {
      toast.error("Error!", { description: "Error, please try again." });
    }
  },
  commentsLength: (post_id: string, allCommentsData: TComment[]) => {
    return allCommentsData?.filter((item) => item?.post === post_id)?.length;
  },
}));

export default usePostStore;
