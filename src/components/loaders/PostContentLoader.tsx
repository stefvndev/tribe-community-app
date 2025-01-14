import { Skeleton } from "@/components/ui/skeleton";

const PostContentLoader = () => {
  return (
    <div className="flex flex-col w-full p-8 pb-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="w-40 h-3" />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full mt-4">
        <Skeleton className="w-64 mb-3 h-7" />
        {...Array(5)
          .fill(null)
          .map((_, index) => (
            <Skeleton key={index} className="w-full h-4 my-1" />
          ))}
      </div>
      <div className="flex items-center w-full gap-5 mt-5">
        <Skeleton className="w-20 h-5" />
        <Skeleton className="h-5 w-28" />
      </div>
    </div>
  );
};

export default PostContentLoader;
