import { IconLoader2, IconSend } from "@tabler/icons-react";
import AvatarIcon from "@/components/avatar/AvatarIcon";
import { Input } from "@/components/ui/input";
import { useGetUserData } from "@/api/get";
import { useMutateCommentOnPost } from "@/api/post";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type TCommentInput = {
  userId?: string;
  post_id?: string;
};

type TSubmitData = {
  content: string;
};

const validationSchema = z.object({
  content: z.string().min(1, "Content is required"),
});

const CommentInput = ({ userId, post_id }: TCommentInput) => {
  const { data: userData } = useGetUserData(userId as string);
  const { mutateAsync: mutateAsyncCommentOnPost, isPending } =
    useMutateCommentOnPost();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<TSubmitData>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async (data: TSubmitData) => {
    const formData = {
      post: post_id,
      user: userId,
      ...data,
    };

    try {
      await mutateAsyncCommentOnPost({ formData });
      reset();
      toast.success("Comment posted successfully! 🙌");
    } catch {
      toast.error("Uh-oh! The post didn't go through. 😕", {
        description: "Try again in a moment!",
      });
    }
  };

  const commentField = watch("content", "");

  return (
    <div className="fixed bottom-0 border max-w-[790px] w-full px-8 mx-auto shadow bg-white pt-4 pb-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center w-full gap-2"
      >
        <AvatarIcon
          avatar={userData?.avatar}
          name={userData?.name || ""}
          id={userData?.id || ""}
          collectionName={userData?.collectionName || ""}
          className="rounded-full min-w-11 min-h-11 size-11"
        />
        <Input
          {...register("content")}
          className="w-full border rounded-xl border-grayout h-11 bg-primary"
          placeholder="Your comment..."
        />
        <button
          disabled={
            commentField === "" || isPending || !!errors?.content?.message
          }
          className={cn(
            "flex items-center self-start justify-center gap-1 px-4 font-bold uppercase border rounded-lg h-11 bg-yellow-primary text-dark-primary hover:bg-yellow-primary-hover disabled:bg-light-gray w-32"
          )}
          type="submit"
        >
          {isPending ? (
            <IconLoader2 className="animate-spin" size={20} />
          ) : (
            <span className="flex items-center gap-1">
              <IconSend size={20} />
              comment
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default CommentInput;
