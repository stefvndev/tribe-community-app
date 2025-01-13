import { useCommunityData, useGetUserData, useListOfAllPosts } from "@/api/get";
import { pb } from "@/api/pocketbase";
import AllPosts from "@/components/community-home/AllPosts";
import CreatePostInput from "@/components/community-home/CreatePostInput";
import CommunityLayout from "@/components/layout/CommunityLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_community/$id/")({
  component: () => (
    <CommunityLayout>
      <RouteComponent />
    </CommunityLayout>
  ),
});

function RouteComponent() {
  const { id } = Route.useParams();
  const userId = pb.authStore.record?.id;
  const { data: userData, isLoading: isUserDataLoading } = useGetUserData(
    userId as string
  );
  const { data: communityData, isLoading: isCommunityDataLoading } =
    useCommunityData(id);
  const { data: allPostsData } = useListOfAllPosts(id);

  return (
    <main className="relative w-full h-full">
      <CreatePostInput
        userData={userData}
        communityData={communityData}
        isUserDataLoading={isUserDataLoading}
        isCommunityDataLoading={isCommunityDataLoading}
      />
      <AllPosts
        allPostsData={allPostsData}
        communityData={communityData}
        isUserDataLoading={isUserDataLoading}
        userId={userId}
      />
    </main>
  );
}
