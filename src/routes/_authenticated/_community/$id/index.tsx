import { createFileRoute } from "@tanstack/react-router";
import { pb } from "@/api/pocketbase";
import { useCommunityData, useGetUserData, useListOfAllPosts } from "@/api/get";
import CreatePostInput from "@/components/community-home/CreatePostInput";
import CommunityLayout from "@/components/layout/CommunityLayout";
import AvatarIcon from "@/components/avatar/AvatarIcon";
import dayjs from "dayjs";
import {
  IconMessageCircle,
  IconThumbUp,
  IconThumbUpFilled,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutateUpdateLikes } from "@/api/patch";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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
  const { mutateAsync: mutateAsyncUpdateLikes } = useMutateUpdateLikes();

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

  return (
    <main className="relative w-full h-full">
      <CreatePostInput
        userData={userData}
        communityData={communityData}
        isUserDataLoading={isUserDataLoading}
        isCommunityDataLoading={isCommunityDataLoading}
      />

      {isUserDataLoading ? (
        <div className="flex flex-col w-full h-full gap-4 max-w-[762px]">
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <Skeleton key={index} className="w-full h-[229px] rounded-lg" />
            ))}
        </div>
      ) : (
        <div className="flex flex-col w-full h-full gap-4 max-w-[762px]">
          {allPostsData?.map((post) => (
            <div
              key={post?.id}
              className="flex flex-col w-full p-6 transition-all bg-white border rounded-lg hover:shadow-custom"
            >
              <div className="flex items-center gap-2">
                <AvatarIcon
                  avatar={post?.expand?.user?.avatar}
                  name={post?.expand?.user?.name || ""}
                  id={post?.expand?.user?.id || ""}
                  collectionName={post?.expand?.user?.collectionName || ""}
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <p className="font-medium text-dark-primary">
                    {post?.expand?.user?.name}
                  </p>
                  <span className="flex items-center text-grayout text-[13px] gap-1">
                    <p>{dayjs(post?.created).format("MMM. DD. YYYY.")}</p>
                    in <p className="font-bold">{communityData?.name}</p>
                  </span>
                </div>
              </div>
              <div className="flex flex-col w-full gap-1">
                <p className="mt-2 text-xl font-bold">{post?.title}</p>
                <p className="w-full h-12 line-clamp-2">{post?.content}</p>
              </div>
              <div className="flex items-center w-full gap-5 mt-2 -ml-2">
                <div className="flex items-center gap-1">
                  <Button
                    onClick={() => handleLikePost(post?.likes, post?.id)}
                    variant="ghost"
                    type="button"
                    className={cn(
                      "w-10 h-10 rounded-full text-grayout",
                      post?.likes?.includes(userId as string)
                        ? "!text-yellow-primary"
                        : "text-grayout"
                    )}
                  >
                    {post?.likes?.includes(userId as string) ? (
                      <IconThumbUpFilled
                        size={23}
                        className="!size-6 stroke-black"
                      />
                    ) : (
                      <IconThumbUp size={23} className="!size-6" />
                    )}
                  </Button>
                  <button type="button" className="font-medium text-grayout">
                    {post?.likes?.length || "0"}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" className="text-grayout">
                    <IconMessageCircle size={22} />
                  </button>
                  <p className="font-medium text-grayout">123</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
