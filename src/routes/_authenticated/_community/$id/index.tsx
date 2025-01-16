import { useEffect, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
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
import SelectedPost from "@/components/community-home/SelectedPost";

type TQueries = {
  postId?: string;
  searchTerm?: string;
};

export const Route = createFileRoute("/_authenticated/_community/$id/")({
  validateSearch: (search: Record<string, unknown>): TQueries => {
    return {
      postId: search.postId as string,
      searchTerm: search.searchTerm as string,
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
  const { postId, searchTerm } = Route.useSearch();
  const userId = pb.authStore.record?.id;
  const { data: userData, isLoading: isUserDataLoading } = useGetUserData(
    userId as string
  );
  const { data: communityData, isLoading: isCommunityDataLoading } =
    useCommunityData(id);
  const { data: allPostsData } = useListOfAllPosts(id);
  const { mutateAsync: mutateAsyncUpdateLikes } = useMutateUpdateLikes();
  const { data: allCommentsData } = useListOfAllComments();

  const searchedPostData = useMemo(() => {
    if (!searchTerm) return allPostsData;
    return allPostsData?.filter((post) =>
      post?.title?.toLocaleLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, allPostsData]);

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

  const handlePushQueryParams = (key: string, postId: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        [key]: postId,
      }),
    });
  };

  useEffect(() => {
    if (postId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [postId, navigate]);

  return (
    <main className="w-full h-full">
      {postId && (
        <SelectedPost
          userId={userId}
          postId={postId}
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
        allPostsData={searchedPostData}
        communityData={communityData}
        isUserDataLoading={isUserDataLoading}
        handlePushQueryParams={handlePushQueryParams}
        handleLikePost={handleLikePost}
        commentsLength={commentsLength}
        searchTerm={searchTerm}
      />
    </main>
  );
}
