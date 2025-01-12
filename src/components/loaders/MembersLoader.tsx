import { Skeleton } from "@/components/ui/skeleton";

const MembersLoader = () => {
  return (
    <>
      {Array(3)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className="flex justify-between w-full py-4 border-b max-sm:flex-col last:border-b-0 border-b-grayout/60"
          >
            <div className="flex gap-4 pb-4">
              <Skeleton className="rounded-full min-h-12 min-w-12 size-12" />
              <div className="flex flex-col mt-1">
                <Skeleton className="w-40 h-4 mb-2" />
                <Skeleton className="w-32 h-3" />
                <Skeleton className="h-4 mt-4 w-96" />
              </div>
            </div>
            <Skeleton className="items-center w-[90px] self-start h-10 rounded-md max-sm:w-full max-sm:mt-2" />
          </div>
        ))}
    </>
  );
};

export default MembersLoader;
