import { Skeleton } from "../ui/skeleton";

const CommunitiesLoader = () => {
  return (
    <div className="grid items-center w-full grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
      {[1, 2, 3]?.map((item) => (
        <article
          key={item}
          className="flex bg-white flex-col w-full overflow-hidden max-lg:max-w-full border max-w-[335px] h-96 rounded-xl hover:shadow-custom"
        >
          <Skeleton className="w-full h-[380px]" />
          <div className="flex flex-col justify-between w-full h-full gap-4 p-4">
            <div className="flex items-center gap-4">
              <Skeleton className="rounded-lg size-10" />
              <Skeleton className="w-20 h-2" />
            </div>
            <div className="max-h-[72px] h-full w-full flex flex-col gap-3">
              <Skeleton className="w-full h-2" />
              <Skeleton className="w-full h-2" />
              <Skeleton className="w-full h-2" />
            </div>
            <div className="flex items-center self-end w-full gap-2">
              <Skeleton className="h-2 w-14" />
              <Skeleton className="rounded-full size-2" />
              <Skeleton className="h-2 w-14" />
              <Skeleton className="rounded-full size-2" />
              <Skeleton className="h-2 w-14" />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default CommunitiesLoader;
