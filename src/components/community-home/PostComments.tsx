import { useListOfAllCommentsForSelectedPost } from "@/api/get";
import AvatarIcon from "@/components/avatar/AvatarIcon";

type TPostComments = {
  post_id?: string;
};

const PostComments = ({ post_id }: TPostComments) => {
  const { data: selectedPostComments } = useListOfAllCommentsForSelectedPost(
    post_id as string
  );

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
            <p className="font-medium text-dark-primary">
              {item?.expand?.user?.name}
            </p>
            <p className="text-dark-primary">{item?.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostComments;
