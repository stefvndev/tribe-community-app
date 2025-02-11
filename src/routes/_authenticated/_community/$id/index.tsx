import {
  useGetUserData,
  useListOfAllComments,
  useListOfAllPosts,
} from "@/api/get";
import AllPosts from "@/components/community-home/AllPosts";
import CreatePostInput from "@/components/community-home/CreatePostInput";
import SelectedPost from "@/components/community-home/SelectedPost";
import CommunityLayout from "@/components/layout/CommunityLayout";
import usePostStore from "@/store/PostStore";
import useUserStore from "@/store/UserStore";
import { TComment } from "@/types/types";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";

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
  const { postId, searchTerm } = Route.useSearch();
  const { userId } = useUserStore();
  const { data: userData, isLoading: isUserDataLoading } = useGetUserData(
    userId as string
  );
  const { data: allPostsData, isLoading: isPostsLoading } =
    useListOfAllPosts(id);
  const { data: allCommentsData } = useListOfAllComments();
  const { setComments } = usePostStore();

  const searchedPostData = useMemo(() => {
    if (!searchTerm) return allPostsData;
    return allPostsData?.filter((post) =>
      post?.title?.toLocaleLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, allPostsData]);

  useEffect(() => {
    setComments(allCommentsData as TComment[]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCommentsData]);

  useEffect(() => {
    document.body.style.overflow = postId ? "hidden" : "";
  }, [postId]);

  return (
    <main className="w-full h-full">
      {postId && <SelectedPost userId={userId} postId={postId} />}

      <CreatePostInput
        userData={userData}
        isUserDataLoading={isUserDataLoading}
      />

      <AllPosts
        allPostsData={searchedPostData}
        isPostsLoading={isPostsLoading}
      />
    </main>
  );
}
