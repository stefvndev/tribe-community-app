import { TCommunities } from "@/types/types";
import { useNavigate } from "@tanstack/react-router";
import CommentInput from "./CommentInput";
import PostComments from "./PostComments";
import PostContent from "./PostContent";

type TSelectedPost = {
  postId?: string;
  communityData?: TCommunities;
  userId?: string;
  handleLikePost: (likes: string[], id: string) => void;
  commentsLength: (post_id: string) => number | undefined;
  isMember?: boolean;
};

const SelectedPost = ({
  postId,
  userId,
  commentsLength,
  handleLikePost,
  isMember,
}: TSelectedPost) => {
  const navigate = useNavigate({ from: "/$id" });

  const handleCloseComment = () => {
    navigate({
      search: (prev) => {
        const newSearch = { ...prev };
        delete newSearch.postId;
        return newSearch;
      },
    });
  };

  return (
    <div
      onClick={handleCloseComment}
      className="fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-screen bg-dark-primary/80"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white relative overflow-y-auto w-full max-md:mt-0 max-md:rounded-none h-[calc(100dvh-64px)] mx-auto max-w-[790px] mt-16 rounded-b-none rounded-lg"
      >
        <PostContent
          postId={postId}
          userId={userId}
          handleLikePost={handleLikePost}
          commentsLength={commentsLength}
          handleCloseComment={handleCloseComment}
          isMember={isMember}
        />
        <hr className="w-full" />
        <PostComments postId={postId} />
        {isMember && <CommentInput userId={userId} postId={postId} />}
      </div>
    </div>
  );
};

export default SelectedPost;
