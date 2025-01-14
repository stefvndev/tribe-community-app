import { Skeleton } from "@/components/ui/skeleton";

const PostCommentsLoader = () => {
  return (
    <div className="flex flex-col w-full gap-6 px-8 pt-8 pb-28">
      {...Array(3)
        .fill(null)
        .map((_, index) => (
          <div key={index} className="flex items-center w-full gap-2">
            <Skeleton className="self-start rounded-full w-11 h-11" />
            <Skeleton className="w-full h-[73px]" />
          </div>
        ))}
    </div>
  );
};

export default PostCommentsLoader;
