import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import AvatarIcon from "../avatar/AvatarIcon";
import { TMessage } from "@/types/types";
import { cn } from "@/lib/utils";
import useUserStore from "@/store/UserStore";

interface MessageListProps {
  messagesData?: TMessage[];
}

const ChatMessages: React.FC<MessageListProps> = ({ messagesData }) => {
  const { userId } = useUserStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [messagesData]);

  return (
    <div className="flex flex-col w-full h-full gap-4 px-4 pt-6 overflow-y-auto max-h-[80%] max-md:h-dvh">
      {messagesData?.map((message) => (
        <div key={message.id} className="flex items-start gap-3">
          <AvatarIcon
            avatar={message?.expand?.sender_id?.avatar as string}
            name={message?.expand?.sender_id?.name as string}
            id={message?.expand?.sender_id?.id as string}
            collectionName={
              message?.expand?.sender_id?.collectionName as string
            }
            className="rounded-full size-11 min-w-11 min-h-11"
          />
          <div
            className={cn(
              "flex flex-col items-start gap-1 border w-full rounded-xl px-3 py-2",
              message?.sender_id === userId ? "bg-primary" : "bg-white"
            )}
          >
            <Link
              to={`/profile/${message?.sender_id}`}
              className="text-sm font-medium text-dark-primary hover:underline"
            >
              {message?.expand?.sender_id?.name}
            </Link>
            <p className="break-all">{message?.message}</p>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
