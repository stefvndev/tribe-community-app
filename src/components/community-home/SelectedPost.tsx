import { useNavigate } from "@tanstack/react-router";
import CommentInput from "./CommentInput";
import PostComments from "./PostComments";
import PostContent from "./PostContent";
import useCommunityStore from "@/store/CommunityStore";

type TSelectedPost = {
  postId?: string;
  userId?: string;
};

const SelectedPost = ({ postId, userId }: TSelectedPost) => {
  const navigate = useNavigate({ from: "/$id" });
  const { data: communityData } = useCommunityStore();
  const isMember = communityData?.members?.includes(userId as string);

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
