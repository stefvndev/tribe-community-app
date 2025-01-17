import { Link } from "@tanstack/react-router";
import dayjs from "dayjs";
import {
  IconMessageCircle,
  IconThumbUp,
  IconThumbUpFilled,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AvatarIcon from "@/components/avatar/AvatarIcon";
import { Skeleton } from "@/components/ui/skeleton";
import { TCommunities, TPost } from "@/types/types";
import highlightText from "@/lib/hightlightText";
import { getPocketBaseFileUrl } from "@/lib/getPocketBaseFileUrl";

type TAllPosts = {
  allPostsData?: TPost[];
  isUserDataLoading: boolean;
  communityData?: TCommunities;
  userId?: string;
  handlePushQueryParams: (key: string, value: string) => void;
  handleLikePost: (likes: string[], id: string) => void;
  commentsLength: (post_id: string) => number | undefined;
  searchTerm?: string;
  isMember?: boolean;
};

const AllPosts = ({
  allPostsData,
  communityData,
  isUserDataLoading,
  userId,
  handlePushQueryParams,
  handleLikePost,
  commentsLength,
  searchTerm,
  isMember,
}: TAllPosts) => {
  return (
    <div className="w-full h-full">
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
          {allPostsData?.length !== 0 ? (
            allPostsData?.map((post) => (
              <div
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
                    <p className="mt-2 text-xl font-bold">
                      {highlightText(post?.title || "", searchTerm || "")}
                    </p>
                    <p className="w-full h-12 line-clamp-2">{post?.content}</p>
                    {/* small screen media */}
                    {post?.media && (
                      <img
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
                        disabled={!isMember}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLikePost(post?.likes, post?.id);
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
                          <IconThumbUpFilled
                            size={23}
                            className="!size-6 stroke-black"
                          />
                        ) : (
                          <IconThumbUp size={23} className="!size-6" />
                        )}
                      </Button>
                      <button
                        type="button"
                        className="font-medium text-grayout"
                      >
                        {post?.likes?.length || "0"}
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <button type="button" className="text-grayout">
                        <IconMessageCircle size={22} />
                      </button>
                      <p className="font-medium text-grayout">
                        {commentsLength(post?.id) || "0"}
                      </p>
                    </div>
                  </div>
                </div>
                {/* large screen media */}
                {post?.media && (
                  <img
                    src={getPocketBaseFileUrl({
                      recordId: post.id,
                      filename: post.media,
                      collectionName: post.collectionName,
                    })}
                    className="border rounded-lg shadow !min-h-28 !min-w-28 size-28 object-cover flex max-sm:hidden"
                  />
                )}
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center w-full gap-1 font-semibold text-center text-grayout">
              <p>It's pretty quiet here... almost like a library. 📚</p>
              <p> Post something to break the silence!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllPosts;
