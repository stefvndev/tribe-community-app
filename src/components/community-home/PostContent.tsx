import { useCallback, useState } from "react";
import { Link } from "@tanstack/react-router";
import dayjs from "dayjs";
import { toast } from "sonner";
import {
  IconDots,
  IconMessageCircle,
  IconThumbUp,
  IconThumbUpFilled,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import AvatarIcon from "@/components/avatar/AvatarIcon";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetSelectedPost } from "@/api/get";
import PostContentLoader from "@/components/loaders/PostContentLoader";
import { getPocketBaseFileUrl } from "@/lib/getPocketBaseFileUrl";
import FullScreenMediaPreview from "./FullScreenMediaPreview";
import { useMutateDeletePost } from "@/api/delete";
import usePostStore from "@/store/PostStore";
import { useMutateUpdateLikes } from "@/api/patch";
import useCommunityStore from "@/store/CommunityStore";

type TPostContent = {
  userId?: string;
  postId?: string;
  handleCloseComment: () => void;
  isMember?: boolean;
};

const PostContent = ({
  postId,
  userId,
  handleCloseComment,
  isMember,
}: TPostContent) => {
  const { data: selectedPostData, isLoading: isPostDataLoading } =
    useGetSelectedPost(postId as string);
  const { data: communityData, isLoading: isCommunityDataLoading } =
    useCommunityStore();
  const isLoading = isPostDataLoading || isCommunityDataLoading;
  const [openFullScreenMedia, setOpenFullScreenMedia] = useState(false);
  const { mutateAsync: mutateAsyncDeletePost } = useMutateDeletePost();
  const isUserOwner = communityData?.createdBy === userId;
  const { handleLikePost, commentsLength, comments } = usePostStore();
  const { mutateAsync: mutateAsyncUpdateLikes } = useMutateUpdateLikes();

  const commentsLengthCallback = useCallback(
    (post_id: string) => commentsLength(post_id, comments),
    [commentsLength, comments]
  );

  const handleLikePostCallback = useCallback(
    (currentLikes: string[], postId: string) => {
      handleLikePost(
        currentLikes,
        postId,
        userId as string,
        mutateAsyncUpdateLikes
      );
    },
    [handleLikePost, userId, mutateAsyncUpdateLikes]
  );

  const handleShowMedia = () => {
    setOpenFullScreenMedia(!openFullScreenMedia);
  };

  const handleCopyPostLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    toast.success("Link copied!");
  };

  const handleDeletePost = async () => {
    try {
      await mutateAsyncDeletePost({
        postId: postId as string,
      });
      handleCloseComment();
      toast("Post removed", {
        description: "Your post was removed successfully!",
      });
    } catch {
      toast.error("Post removal failed.", {
        description:
          "We couldn't remove your post at this time. Please try again later or check your connection.",
      });
    }
  };

  if (isLoading) return <PostContentLoader />;

  if (openFullScreenMedia)
    return (
      <FullScreenMediaPreview
        handleShowMedia={handleShowMedia}
        data={selectedPostData}
      />
    );

  return (
    <div className="flex flex-col w-full p-8 pb-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <AvatarIcon
            avatar={selectedPostData?.expand?.user?.avatar}
            name={selectedPostData?.expand?.user?.name || ""}
            id={selectedPostData?.expand?.user?.id || ""}
            collectionName={
              selectedPostData?.expand?.user?.collectionName || ""
            }
            className="rounded-full"
          />
          <div className="flex flex-col">
            <Link
              to={`/profile/${selectedPostData?.expand?.user?.id}`}
              className="font-medium text-dark-primary hover:underline"
            >
              {selectedPostData?.expand?.user?.name}
            </Link>
            <span className="flex items-center text-grayout text-[13px] gap-1">
              <p>{dayjs(selectedPostData?.created).format("MMM. DD. YYYY.")}</p>
              in <p className="font-bold">{communityData?.name}</p>
            </span>
          </div>
        </div>
        <Popover>
          <PopoverTrigger
            data-testid="popover-trigger-button"
            className="p-2 rounded-full hover:bg-light-gray/50"
          >
            <IconDots size={22} />
          </PopoverTrigger>
          <PopoverContent className="px-0 max-w-52" align="end">
            <div className="flex flex-col w-full">
              <button
                onClick={handleCloseComment}
                type="button"
                className="flex items-center transition-all ease-in-out hover:bg-light-gray"
              >
                <p className="p-4 font-bold text-dark-primary">Exit post</p>
              </button>
              <button
                onClick={handleCopyPostLink}
                type="button"
                className="flex items-center transition-all ease-in-out hover:bg-light-gray"
              >
                <p className="p-4 font-bold text-dark-primary">Copy link</p>
              </button>
              {(selectedPostData?.user === userId || isUserOwner) && (
                <button
                  data-testid="delete-post-button"
                  onClick={handleDeletePost}
                  type="button"
                  className="flex items-center transition-all ease-in-out hover:text-white text-dark-primary hover:bg-red-600"
                >
                  <p className="p-4 font-bold">Delete post</p>
                </button>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col w-full mt-3">
        <p className="text-2xl font-bold text-dark-primary">
          {selectedPostData?.title}
        </p>
        <p className="mt-1 text-dark-primary">{selectedPostData?.content}</p>
      </div>
      {selectedPostData?.media && (
        <button type="button" onClick={handleShowMedia} className="mt-6 w-fit">
          <img
            alt="attachement"
            src={getPocketBaseFileUrl({
              recordId: selectedPostData?.id,
              filename: selectedPostData?.media,
              collectionName: selectedPostData?.collectionName,
            })}
            className="object-cover border rounded-lg shadow size-40"
          />
        </button>
      )}
      <div className="flex items-center w-full gap-5 mt-5 -ml-2">
        <div className="flex items-center gap-1">
          <Button
            disabled={!isMember}
            onClick={(e) => {
              e.stopPropagation();
              handleLikePostCallback(
                selectedPostData?.likes || [],
                selectedPostData?.id || ""
              );
            }}
            variant="ghost"
            type="button"
            className={cn(
              "w-10 h-10 rounded-full text-grayout",
              selectedPostData?.likes?.includes(userId as string)
                ? "!text-yellow-primary"
                : "text-grayout"
            )}
          >
            {selectedPostData?.likes?.includes(userId as string) ? (
              <IconThumbUpFilled size={23} className="!size-6 stroke-black" />
            ) : (
              <IconThumbUp size={23} className="!size-6" />
            )}
          </Button>
          <button type="button" className="font-medium text-grayout">
            {selectedPostData?.likes?.length || "0"}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="text-grayout">
            <IconMessageCircle size={22} />
          </button>
          <p className="font-medium text-grayout">
            {commentsLengthCallback(selectedPostData?.id as string) || "0"}{" "}
            comments
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostContent;
