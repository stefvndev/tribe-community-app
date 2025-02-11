import { useCallback } from "react";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import dayjs from "dayjs";
import AvatarIcon from "@/components/avatar/AvatarIcon";
import { getPocketBaseFileUrl } from "@/lib/getPocketBaseFileUrl";
import highlightText from "@/lib/hightlightText";
import { TPost } from "@/types/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  IconMessageCircle,
  IconThumbUp,
  IconThumbUpFilled,
} from "@tabler/icons-react";
import useCommunityStore from "@/store/CommunityStore";
import usePostStore from "@/store/PostStore";
import { useMutateUpdateLikes } from "@/api/patch";
import useUserStore from "@/store/UserStore";

type TPostCard = {
  post: TPost;
};

const PostCard = ({ post }: TPostCard) => {
  const { userId } = useUserStore();
  const navigate = useNavigate({ from: "/$id" });
  const { searchTerm } = useSearch({ strict: false });
  const { data: communityData } = useCommunityStore();
  const { handleLikePost, commentsLength, comments } = usePostStore();
  const isMember = communityData?.members?.includes(userId as string);
  const { mutateAsync: mutateAsyncUpdateLikes } = useMutateUpdateLikes();

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

  const commentsLengthCallback = useCallback(
    (post_id: string) => commentsLength(post_id, comments),
    [commentsLength, comments]
  );

  const handlePushQueryParams = useCallback(
    (key: string, postId: string) => {
      navigate({
        search: (prev) => ({ ...prev, [key]: postId }),
      });
    },
    [navigate]
  );

  return (
    <div
      data-testid="post-card"
      key={post?.id}
      onClick={() => handlePushQueryParams("postId", post?.id)}
      className="flex items-center w-full gap-10 p-6 transition-all bg-white border rounded-lg cursor-pointer max-sm:items-start max-sm:flex-col hover:shadow-custom max-sm:gap-4"
    >
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-2">
          <AvatarIcon
            avatar={post?.expand?.user?.avatar}
            name={post?.expand?.user?.name || ""}
            id={post?.expand?.user?.id || ""}
            collectionName={post?.expand?.user?.collectionName || ""}
            className="rounded-full"
          />
          <div className="flex flex-col whitespace-nowrap">
            <Link
              onClick={(e) => e.stopPropagation()}
              to={`/profile/${post?.expand?.user?.id}`}
              className="font-medium text-dark-primary hover:underline"
            >
              {post?.expand?.user?.name}
            </Link>
            <span className="flex items-center text-grayout text-[13px] gap-1">
              <p>{dayjs(post?.created).format("MMM. DD. YYYY.")}</p>
              in <p className="font-bold">{communityData?.name}</p>
            </span>
          </div>
        </div>
        <div className="flex flex-col w-full gap-1">
          <p data-testid="post-card-title" className="mt-2 text-xl font-bold">
            {highlightText(post?.title || "", searchTerm || "")}
          </p>
          <p className="w-full h-12 line-clamp-2">{post?.content}</p>
          {/* small screen media */}
          {post?.media && (
            <img
              loading="lazy"
              alt="Post media"
              src={getPocketBaseFileUrl({
                recordId: post.id,
                filename: post.media,
                collectionName: post.collectionName,
              })}
              className="border rounded-lg mt-3 mb-2 hidden max-sm:flex shadow !min-h-28 !min-w-28 size-28 object-cover"
            />
          )}
        </div>
        <div className="flex items-center w-full gap-5 mt-2 -ml-2">
          <div className="flex items-center gap-1">
            <Button
              data-testid="like-button"
              disabled={!isMember}
              onClick={(e) => {
                e.stopPropagation();
                handleLikePostCallback(post?.likes, post?.id);
              }}
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
                <IconThumbUpFilled size={23} className="!size-6 stroke-black" />
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
            <p className="font-medium text-grayout">
              {commentsLengthCallback(post?.id) || "0"}
            </p>
          </div>
        </div>
      </div>
      {/* large screen media */}
      {post?.media && (
        <img
          loading="lazy"
          alt="Post media"
          src={getPocketBaseFileUrl({
            recordId: post.id,
            filename: post.media,
            collectionName: post.collectionName,
          })}
          className="border rounded-lg shadow !min-h-28 !min-w-28 size-28 object-cover flex max-sm:hidden"
        />
      )}
    </div>
  );
};

export default PostCard;
