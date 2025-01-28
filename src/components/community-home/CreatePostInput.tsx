import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IconLoader2, IconPhotoPlus, IconX } from "@tabler/icons-react";
import { EmojiClickData } from "emoji-picker-react";
import { useMutatePublishPost } from "@/api/post";
import AvatarIcon from "@/components/avatar/AvatarIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import { TUserData } from "@/types/types";
import EmojiButton from "@/components/buttons/EmojiButton";
import useCommunityStore from "@/store/CommunityStore";
import MainButton from "@/components/buttons/MainButton";

type TCreatePost = {
  userData?: TUserData;
  isUserDataLoading: boolean;
  isMember?: boolean;
};

type TSubmitData = {
  title: string;
  content: string;
  media?: File | null;
};

const MAX_FILE_SIZE = 5242880; // 5MB

const validationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  media: z
    .instanceof(File)
    .optional()
    .nullable()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: `Media file size should be less than 5MB`,
    }),
});

const CreatePostInput = ({ isUserDataLoading, userData }: TCreatePost) => {
  const { data: communityData, isLoading: isCommunityDataLoading } =
    useCommunityStore();
  const [isCommentBoxActive, setIsCommentBoxActive] = useState(false);
  const {
    mutateAsync: mutateAsyncPublishPost,
    isPending: isPublishingPending,
  } = useMutatePublishPost();
  const isMember = communityData?.members?.includes(userData?.id as string);

  const [postMedia, setPostMedia] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TSubmitData>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async (data: TSubmitData) => {
    if (!data) return;
    try {
      const formData = new FormData();
      formData.append("content", data.content);
      formData.append("title", data.title);
      formData.append("user", userData?.id as string);
      formData.append("community", communityData?.id as string);
      if (data.media) formData.append("media", data.media as Blob);

      await mutateAsyncPublishPost({
        formData,
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

  const handleCommentBox = () => setIsCommentBoxActive((prev) => !prev);

  const title = watch("title", "");
  const content = watch("content", "");

  const isSubmitDisabled =
    !title.trim() || !content.trim() || !!errors.title || !!errors.content;

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    const emoji = emojiData.emoji;
    setValue("content", content + emoji);
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPostMedia(file);
    setValue("media", file);
  };

  const handleRemoveMedia = () => {
    setPostMedia(null);
    setValue("media", null);
    const fileInput = document.getElementById(
      "mediaUpload"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  useEffect(() => {
    if (isCommentBoxActive) {
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isCommentBoxActive]);

  useEffect(() => {
    if (errors?.media?.message) {
      toast.error(errors?.media?.message);
    }
  }, [errors]);

  return (
    <div className="relative w-full mb-10">
      {isCommentBoxActive && (
        <button
          disabled={!isMember}
          type="button"
          onClick={handleCommentBox}
          className="fixed top-0 bottom-0 left-0 right-0 z-40 w-full h-full transition-all duration-500 ease-in-out cursor-default bg-grayout/60"
        />
      )}

      <div className="flex items-center justify-center mx-auto mt-1 max-w-1075">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full"
        >
          {isCommentBoxActive ? (
            <div className="relative z-50 flex flex-col justify-between w-full gap-4 p-4 bg-white rounded-lg min-h-64 shadow-custom">
              <div className="flex flex-col w-full gap-4">
                <div className="flex items-center gap-2.5 whitespace-nowrap">
                  <AvatarIcon
                    avatar={userData?.avatar}
                    name={userData?.name || ""}
                    id={userData?.id || ""}
                    collectionName={userData?.collectionName || ""}
                    className="rounded-full min-w-8 min-h-8 size-8"
                  />
                  <span className="flex items-center gap-1.5 max-sm:items-start max-sm:gap-0 max-sm:flex-col">
                    <p className="font-medium truncate text-dark-primary max-sm:max-w-64">
                      {userData?.name}
                    </p>
                    <div className="flex items-center gap-1.5 max-sm:items-start">
                      <p className="text-grayout">posting in</p>
                      <p className="font-medium truncate text-dark-primary max-sm:max-w-48">
                        {communityData?.name}
                      </p>
                    </div>
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <Input
                    data-testid="post-title-input"
                    {...register("title")}
                    type="text"
                    placeholder="Title"
                    className="pl-0 bg-white shadow-none placeholder:text-grayout h-[35px] font-bold !text-2xl"
                  />
                  <Textarea
                    data-testid="post-description-input"
                    {...register("content")}
                    placeholder="Write something..."
                    className="pl-0 scrollbar-hide bg-white shadow-none border-none placeholder:text-grayout !text-base min-h-5 h-fit"
                  />
                </div>
              </div>

              {postMedia && (
                <div className="relative flex items-center size-52">
                  <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-end w-full h-full transition-all opacity-0 hover:opacity-100">
                    <button
                      className="p-2 m-2 bg-white border rounded-full shadow size-fit"
                      type="button"
                      onClick={handleRemoveMedia}
                    >
                      <IconX size={20} />
                    </button>
                  </div>
                  <img
                    alt="attachment"
                    className="object-cover border rounded-lg shadow size-52"
                    src={URL.createObjectURL(postMedia as Blob)}
                  />
                </div>
              )}

              <div className="flex items-center w-full max-sm:gap-4 gap-14">
                <div className="flex items-center w-full gap-0.5">
                  <Button
                    variant="ghost"
                    className="relative rounded-full w-11 h-11"
                    type="button"
                  >
                    <IconPhotoPlus className="!size-5" />
                    <input
                      id="mediaUpload"
                      onChange={handleMediaUpload}
                      type="file"
                      accept="image/*"
                      className="absolute top-0 bottom-0 left-0 right-0 z-10 w-full h-full opacity-0 cursor-pointer"
                    />
                  </Button>

                  <EmojiButton handleEmojiClick={handleEmojiClick} />
                </div>

                <div className="flex items-center justify-end gap-5 w-fit max-sm:self-end">
                  <button
                    disabled={isPublishingPending}
                    onClick={handleCommentBox}
                    type="button"
                    className="font-bold uppercase transition-all text-grayout hover:text-dark-primary"
                  >
                    Cancel
                  </button>
                  <MainButton
                    type="submit"
                    disabled={isSubmitDisabled || isPublishingPending}
                    className="h-12 px-7"
                  >
                    {isPublishingPending ? (
                      <IconLoader2 className="animate-spin" size={18} />
                    ) : (
                      "post"
                    )}
                  </MainButton>
                </div>
              </div>
            </div>
          ) : (
            <button
              data-testid="create-post-button"
              disabled={
                isCommunityDataLoading || isUserDataLoading || !isMember
              }
              onClick={handleCommentBox}
              type="button"
              className="w-full disabled:cursor-not-allowed bg-white gap-4 rounded-lg shadow-custom h-[60px] flex items-center py-2.5 px-4"
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
