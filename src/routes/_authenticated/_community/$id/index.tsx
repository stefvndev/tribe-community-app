import { useEffect } from "react";
import {
  useCommunityData,
  useGetUserData,
  useListOfAllComments,
  useListOfAllPosts,
} from "@/api/get";
import { useMutateUpdateLikes } from "@/api/patch";
import { pb } from "@/api/pocketbase";
import AllPosts from "@/components/community-home/AllPosts";
import CreatePostInput from "@/components/community-home/CreatePostInput";
import CommunityLayout from "@/components/layout/CommunityLayout";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import SelectedPost from "@/components/community-home/SelectedPost";

type TQueries = {
  post_id?: string;
};

export const Route = createFileRoute("/_authenticated/_community/$id/")({
  validateSearch: (search: Record<string, unknown>): TQueries => {
    return {
      post_id: search.post_id as string,
    };
  },
  component: () => (
    <CommunityLayout>
      <RouteComponent />
    </CommunityLayout>
  ),
});

function RouteComponent() {
  const { id } = Route.useParams();
  const navigate = Route.useNavigate();
  const { post_id } = Route.useSearch();
  const userId = pb.authStore.record?.id;
  const { data: userData, isLoading: isUserDataLoading } = useGetUserData(
    userId as string
  );
  const { data: communityData, isLoading: isCommunityDataLoading } =
    useCommunityData(id);
  const { data: allPostsData } = useListOfAllPosts(id);
  const { mutateAsync: mutateAsyncUpdateLikes } = useMutateUpdateLikes();
  const { data: allCommentsData } = useListOfAllComments();

  const handleLikePost = async (currentLikes: string[], postId: string) => {
    try {
      const updatedLikes = (currentLikes || []).includes(userId as string)
        ? (currentLikes || []).filter((id) => id !== userId)
        : ([...(currentLikes || []), userId] as string[]);

      await mutateAsyncUpdateLikes({ updatedLikes, postId });
    } catch {
      toast.error("Error!", {
        description: "Error, please try again.",
      });
    }
  };

  const commentsLength = (post_id: string) =>
    allCommentsData?.filter((item) => item?.post === post_id)?.length;

  const handleOpenComments = (postId: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        post_id: postId,
      }),
    });
  };

  useEffect(() => {
    if (post_id) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [post_id, navigate]);

  return (
    <main className="w-full h-full">
      {post_id && (
        <SelectedPost
          userId={userId}
          post_id={post_id}
          handleLikePost={handleLikePost}
          commentsLength={commentsLength}
        />
      )}

      <CreatePostInput
        userData={userData}
        communityData={communityData}
        isUserDataLoading={isUserDataLoading}
        isCommunityDataLoading={isCommunityDataLoading}
      />

      <AllPosts
        userId={userId}
        allPostsData={allPostsData}
        communityData={communityData}
        isUserDataLoading={isUserDataLoading}
        handleOpenComments={handleOpenComments}
        handleLikePost={handleLikePost}
        commentsLength={commentsLength}
      />
    </main>
  );
}
