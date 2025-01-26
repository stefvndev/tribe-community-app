import { TUserData } from "@/types/types";
import AvatarIcon from "../avatar/AvatarIcon";
import { Link } from "@tanstack/react-router";

interface ChatHeaderProps {
  conversationUserData?: TUserData;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ conversationUserData }) => (
  <div className="relative flex items-center justify-between w-full gap-2 p-4 border-b">
    <div className="flex items-center gap-4">
      <AvatarIcon
        avatar={conversationUserData?.avatar as string}
        name={conversationUserData?.name as string}
        id={conversationUserData?.id as string}
        collectionName={conversationUserData?.collectionName as string}
        className="rounded-full size-11 min-w-11 min-h-11"
      />
      <div className="flex flex-col items-start">
        <Link
          to={`/profile/${conversationUserData?.id}`}
          className="font-medium text-dark-primary hover:underline"
        >
          {conversationUserData?.name}
        </Link>
        <p className="text-sm text-grayout">
          {conversationUserData?.description || "No description yet."}
        </p>
      </div>
    </div>
  </div>
);

export default ChatHeader;
