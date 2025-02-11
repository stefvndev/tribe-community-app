import { useNavigate, useParams } from "@tanstack/react-router";
import { useConversationsData } from "@/api/get";
import AvatarIcon from "@/components/avatar/AvatarIcon";
import { cn } from "@/lib/utils";
import useUserStore from "@/store/UserStore";

type TChatLayout = {
  children: React.ReactNode;
};

const ChatLayout = ({ children }: TChatLayout) => {
  const { id } = useParams({ from: "/_authenticated/chat/$id/" });
  const { userId } = useUserStore();
  const navigate = useNavigate({ from: "" });
  const { data: allConversationsData } = useConversationsData(userId as string);

  return (
    <div className="flex items-center max-md:flex-col gap-6 py-6 w-full h-[calc(100dvh-64px)] mx-auto max-w-1075">
      <div className="flex flex-col w-full h-full overflow-y-auto bg-white border rounded-lg shadow min-w-72 max-w-72 max-md:max-w-full max-md:max-h-56 max-md:min-h-56">
        <h2 className="p-2 font-bold border-b">Conversations</h2>
        {allConversationsData?.map((conversation) => {
          const notYou = conversation?.expand?.users?.filter(
            (user) => user?.id !== userId
          )[0];

          const messages = Array.isArray(conversation?.expand?.messages)
            ? conversation?.expand?.messages
            : conversation?.expand?.messages
              ? [conversation?.expand?.messages]
              : [];

          const lastMessage = messages.length
            ? messages[messages.length - 1]
            : undefined;

          const isUnread =
            messages?.find((message) => message?.seen === false) !== undefined;

          const isSentByCurrentUserAndUnseen =
            lastMessage?.sender_id === userId && !lastMessage?.seen;

          return (
            <button
              onClick={() => navigate({ to: `/chat/${conversation.id}` })}
              key={conversation.id}
              type="button"
              className={cn(
                "flex items-center w-full gap-3 px-4 py-3 h-[72px] border-b hover:bg-light-gray",
                (isSentByCurrentUserAndUnseen || !isUnread) &&
                  id !== conversation.id &&
                  "opacity-60",
                id === conversation.id && "bg-light-gray/50"
              )}
            >
              <AvatarIcon
                avatar={notYou?.avatar}
                name={notYou?.name}
                id={notYou?.id}
                collectionName={notYou?.collectionName}
                className="rounded-full size-11 min-w-11 min-h-11"
              />
              <div className="flex flex-col items-start w-full">
                <p className="font-bold truncate text-dark-primary">
                  {notYou?.name}
                </p>
                <p className="w-full text-sm truncate text-start max-w-48">
                  {lastMessage?.message}
                </p>
              </div>

              {isUnread && !isSentByCurrentUserAndUnseen && (
                <span className="p-1 bg-blue-500 rounded-full animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      <div className="w-full h-full max-md:max-h-[800px] max-md:pb-10">
        {children}
      </div>
    </div>
  );
};

export default ChatLayout;
