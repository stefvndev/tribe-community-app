import { TCommunities } from "@/types/types";
import { useNavigate } from "@tanstack/react-router";
import CommentInput from "./CommentInput";
import PostComments from "./PostComments";
import PostContent from "./PostContent";

type TSelectedPost = {
  post_id?: string;
  communityData?: TCommunities;
  userId?: string;
  handleLikePost: (likes: string[], id: string) => void;
  commentsLength: (post_id: string) => number | undefined;
};

const SelectedPost = ({
  post_id,
  userId,
  commentsLength,
  handleLikePost,
}: TSelectedPost) => {
  const navigate = useNavigate({ from: "/$id" });

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
        className="bg-white relative overflow-y-auto w-full max-md:mt-0 max-md:rounded-none h-[calc(100vh-64px)] mx-auto max-w-[790px] mt-16 rounded-b-none rounded-lg"
      >
        <PostContent
          post_id={post_id}
          userId={userId}
          handleLikePost={handleLikePost}
          commentsLength={commentsLength}
          handleCloseComment={handleCloseComment}
        />
        <hr className="w-full" />
        <PostComments post_id={post_id} />
        <CommentInput userId={userId} post_id={post_id} />
      </div>
    </div>
  );
};

export default SelectedPost;
