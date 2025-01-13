import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TCommunities, TUserData } from "@/types/types";
import { cn } from "@/lib/utils";
import { z } from "zod";
import AvatarIcon from "@/components/avatar/AvatarIcon";
import { Input } from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import { useMutatePublishPost } from "@/api/post";
import { toast } from "sonner";
import { IconLoader2 } from "@tabler/icons-react";

type TCreatePost = {
  userData?: TUserData;
  communityData?: TCommunities;
  isUserDataLoading: boolean;
  isCommunityDataLoading: boolean;
};

type TSubmitData = {
  title: string;
  content: string;
};

const validationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

const CreatePostInput = ({
  communityData,
  isCommunityDataLoading,
  isUserDataLoading,
  userData,
}: TCreatePost) => {
  const [isCommentBoxActive, setIsCommentBoxActive] = useState(false);
  const {
    mutateAsync: mutateAsyncPublishPost,
    isPending: isPublishingPending,
  } = useMutatePublishPost();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<TSubmitData>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async (data: TSubmitData) => {
    if (!data) return;
    try {
      await mutateAsyncPublishPost({
        content: data?.content,
        title: data?.title,
        user: userData?.id as string,
        community: communityData?.id as string,
      });
      reset();
      setIsCommentBoxActive(false);
      toast.success("Post Published Successfully!", {
        description: "Your post has been published and is now live. Great job!",
      });
    } catch {
      toast.error("Error!", {
        description: "Error, please try again.",
      });
    }
  };

  const handleCommentBox = () => {
    setIsCommentBoxActive(!isCommentBoxActive);
  };

  const title = watch("title", "");
  const content = watch("content", "");

  const isSubmitDisabled =
    !title.trim() || !content.trim() || !!errors.title || !!errors.content;

  return (
    <div className="relative w-full mb-10">
      {isCommentBoxActive && (
        <button
          type="button"
          onClick={handleCommentBox}
          className="fixed top-0 bottom-0 left-0 right-0 z-20 w-full h-full transition-all duration-500 ease-in-out cursor-default bg-grayout/60"
        />
      )}
      <div className="flex items-center justify-center mx-auto mt-1 max-w-1075">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full"
        >
          {isCommentBoxActive ? (
            <div className="relative z-30 flex flex-col justify-between w-full gap-4 p-4 bg-white rounded-lg min-h-64 shadow-custom">
              <div className="flex flex-col w-full gap-4">
                <div className="flex items-center gap-2.5">
                  <AvatarIcon
                    avatar={userData?.avatar}
                    name={userData?.name || ""}
                    id={userData?.id || ""}
                    collectionName={userData?.collectionName || ""}
                    className="rounded-full min-w-8 min-h-8 size-8"
                  />
                  <span className="flex items-center gap-1.5">
                    <p className="font-medium text-dark-primary">
                      {userData?.name}
                    </p>
                    <p className="text-grayout">posting in</p>
                    <p className="font-medium text-dark-primary">
                      {communityData?.name}
                    </p>
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <Input
                    {...register("title")}
                    type="text"
                    placeholder="Title"
                    className="pl-0 bg-white shadow-none placeholder:text-grayout h-[35px] font-bold !text-2xl"
                  />
                  <Textarea
                    {...register("content")}
                    placeholder="Write something..."
                    className="pl-0 scrollbar-hide bg-white shadow-none border-none placeholder:text-grayout !text-base min-h-5 h-fit"
                  />
                </div>
              </div>
              <div className="flex items-center w-full">
                <div className="flex items-center justify-end w-full gap-5">
                  <button
                    disabled={isPublishingPending}
                    onClick={handleCommentBox}
                    type="button"
                    className="font-bold uppercase transition-all text-grayout hover:text-dark-primary"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={isSubmitDisabled || isPublishingPending}
                    type="submit"
                    className={cn(
                      "flex items-center justify-center h-12 px-7 font-bold uppercase rounded-md bg-yellow-primary text-dark-primary hover:bg-yellow-primary-hover",
                      (isSubmitDisabled || isPublishingPending) &&
                        "bg-light-gray text-gray-500 hover:bg-light-gray"
                    )}
                  >
                    {isPublishingPending ? (
                      <IconLoader2 className="animate-spin" size={18} />
                    ) : (
                      "post"
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              disabled={isCommunityDataLoading || isUserDataLoading}
              onClick={handleCommentBox}
              type="button"
              className="w-full bg-white gap-4 rounded-lg shadow-custom h-[60px] flex items-center py-2.5 px-4"
            >
              <AvatarIcon
                avatar={userData?.avatar}
                name={userData?.name || ""}
                id={userData?.id || ""}
                collectionName={userData?.collectionName || ""}
                className="rounded-full"
              />
              <p className="text-xl font-medium text-grayout ">
                Write somehting
              </p>
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreatePostInput;
