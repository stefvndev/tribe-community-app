import { Skeleton } from "@/components/ui/skeleton";
import { TPost } from "@/types/types";
import PostCard from "./PostCard";

type TAllPosts = {
  isPostsLoading: boolean;
  allPostsData?: TPost[];
};

const AllPosts = ({ allPostsData, isPostsLoading }: TAllPosts) => {
  return (
    <div className="w-full h-full">
      {isPostsLoading ? (
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
            allPostsData?.map((post) => <PostCard post={post} key={post?.id} />)
          ) : (
            <div className="flex flex-col items-center w-full gap-1 font-semibold text-center text-grayout">
              <p>It's pretty quiet here... almost like a library. 📚</p>
              <p>Post something to break the silence!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllPosts;
