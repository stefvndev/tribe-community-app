import { Link } from "@tanstack/react-router";
import { useListOfAllCommentsForSelectedPost } from "@/api/get";
import AvatarIcon from "@/components/avatar/AvatarIcon";
import PostCommentsLoader from "@/components/loaders/PostCommentsLoader";

type TPostComments = {
  postId?: string;
};

const PostComments = ({ postId }: TPostComments) => {
  const { data: selectedPostComments, isLoading } =
    useListOfAllCommentsForSelectedPost(postId as string);

  if (isLoading) return <PostCommentsLoader />;

  return (
    <div className="flex flex-col w-full gap-6 px-8 pt-8 pb-28">
      {selectedPostComments?.map((item) => (
        <div key={item.id} className="flex items-center w-full gap-2">
          <AvatarIcon
            avatar={item?.expand?.user?.avatar}
            name={item?.expand?.user?.name || ""}
            id={item?.expand?.user?.id || ""}
            collectionName={item?.expand?.user?.collectionName || ""}
            className="self-start rounded-full"
          />
          <div className="flex flex-col w-full p-3 border rounded-xl bg-primary">
            <Link
              to={`/profile/${item?.expand?.user?.id}`}
              className="font-medium text-dark-primary hover:underline"
            >
              {item?.expand?.user?.name}
            </Link>
            <p className="text-dark-primary">{item?.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostComments;
