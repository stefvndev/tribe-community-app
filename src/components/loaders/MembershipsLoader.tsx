import { Skeleton } from "../ui/skeleton";

const MembershipsLoader = () => {
  return (
    <>
      {Array(4)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between w-full border-b max-md:flex-col last:border-b-0"
          >
            <div className="flex items-center w-full gap-2 pb-5">
              <Skeleton className="rounded-lg min-w-10 min-h-10 size-10" />
              <div className="flex flex-col">
                <Skeleton className="w-32 h-3" />
                <div className="flex items-center gap-1 mt-1 text-xs font-medium text-grayout">
                  <Skeleton className="w-12 h-3" />
                  <span className="text-grayout">•</span>
                  <Skeleton className="w-12 h-3" />
                  <span className="text-grayout">•</span>
                  <Skeleton className="w-12 h-3" />
                </div>
              </div>
            </div>
            <Skeleton className="w-16 h-8 mb-6" />
          </div>
        ))}
    </>
  );
};

export default MembershipsLoader;
