import { useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import { toast } from "sonner";
import {
  useGetSelectedPost,
  useListOfAllCommentsForSelectedPost,
} from "@/api/get";
import AvatarIcon from "@/components/avatar/AvatarIcon";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  IconDots,
  IconMessageCircle,
  IconThumbUp,
  IconThumbUpFilled,
} from "@tabler/icons-react";
import { TCommunities } from "@/types/types";

type TSelectedPost = {
  post_id?: string;
  communityData?: TCommunities;
  userId?: string;
  handleLikePost: (likes: string[], id: string) => void;
  commentsLength: (post_id: string) => number | undefined;
};

const SelectedPost = ({
  post_id,
  communityData,
  userId,
  commentsLength,
  handleLikePost,
}: TSelectedPost) => {
  const navigate = useNavigate({ from: "/$id" });
  const { data: selectedPostData } = useGetSelectedPost(post_id as string);
  const { data: selectedPostComments } = useListOfAllCommentsForSelectedPost(
    post_id as string
  );

  const handleCopyPostLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    toast.success("Link copied!");
  };

  const handleCloseComment = () => {
    navigate({
      search: (prev) => {
        const newSearch = { ...prev };
        delete newSearch.post_id;
        return newSearch;
      },
    });
  };

  return (
    <div
      onClick={handleCloseComment}
      className="fixed top-0 bottom-0 left-0 right-0 z-40 w-full h-screen bg-dark-primary/80"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white overflow-y-auto w-full h-[calc(100vh-64px)] mx-auto max-w-[790px] mt-16 rounded-b-none rounded-lg"
      >
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
                <p className="font-medium text-dark-primary">
                  {selectedPostData?.expand?.user?.name}
                </p>
                <span className="flex items-center text-grayout text-[13px] gap-1">
                  <p>
                    {dayjs(selectedPostData?.created).format("MMM. DD. YYYY.")}
                  </p>
                  in <p className="font-bold">{communityData?.name}</p>
                </span>
              </div>
            </div>
            <Popover>
              <PopoverTrigger className="p-2 rounded-full hover:bg-light-gray/50">
                <IconDots size={22} />
              </PopoverTrigger>
              <PopoverContent className="px-0 max-w-52" align="end">
                <div className="flex flex-col w-full">
                  <button
                    onClick={handleCopyPostLink}
                    type="button"
                    className="flex items-center transition-all ease-in-out hover:bg-light-gray"
                  >
                    <p className="p-4 font-bold text-dark-primary">Copy link</p>
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col w-full mt-3">
            <p className="text-2xl font-bold text-dark-primary">
              {selectedPostData?.title}
            </p>
            <p className="mt-1 text-dark-primary">
              {selectedPostData?.content}
            </p>
          </div>
          <div className="flex items-center w-full gap-5 mt-5 -ml-2">
            <div className="flex items-center gap-1">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLikePost(
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
                  <IconThumbUpFilled
                    size={23}
                    className="!size-6 stroke-black"
                  />
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
                {commentsLength(selectedPostData?.id as string) || "0"} comments
              </p>
            </div>
          </div>
        </div>
        <hr className="w-full" />
        <div className="flex flex-col w-full gap-6 px-8 pt-8 pb-4">
          {selectedPostComments?.map((item) => (
            <div key={item.id} className="flex items-center w-full gap-2">
              <AvatarIcon
                avatar={item?.expand?.user?.avatar}
                name={item?.expand?.user?.name || ""}
                id={item?.expand?.user?.id || ""}
                collectionName={item?.expand?.user?.collectionName || ""}
                className="self-start rounded-full"
              />
              <div className="flex flex-col w-full p-3 border rounded-xl bg-primary">
                <p className="font-medium text-dark-primary">
                  {item?.expand?.user?.name}
                </p>
                <p className="text-dark-primary">{item?.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectedPost;
