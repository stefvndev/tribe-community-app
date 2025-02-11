import { useConversationsData } from "@/api/get";
import AvatarIcon from "@/components/avatar/AvatarIcon";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import useUserStore from "@/store/UserStore";
import { TConversation, TMessage } from "@/types/types";
import { IconLoader2, IconMessageCircle } from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";

const NavbarMessagesDropdown = () => {
  const { userId } = useUserStore();
  const navigate = useNavigate({ from: "" });
  const { data: allConversationsData, isLoading } = useConversationsData(
    userId as string
  );

  const getUnreadMessagesCount = (conversation: TConversation) => {
    const messages = Array.isArray(conversation?.expand?.messages)
      ? conversation?.expand?.messages
      : conversation?.expand?.messages
        ? [conversation?.expand?.messages]
        : [];

    return messages?.filter(
      (message) => message.receiver_id === userId && !message.seen
    ).length;
  };

  const isSentByCurrentUserAndUnseen = (lastMessage: TMessage | undefined) => {
    return lastMessage?.sender_id === userId && !lastMessage?.seen;
  };

  const getTotalUnreadConversations = () => {
    return allConversationsData?.reduce((acc, conversation) => {
      const messages = Array.isArray(conversation?.expand?.messages)
        ? conversation?.expand?.messages
        : conversation?.expand?.messages
          ? [conversation?.expand?.messages]
          : [];

      const lastMessage = messages.length
        ? messages[messages.length - 1]
        : undefined;
      return (
        acc +
        (getUnreadMessagesCount(conversation) > 0 &&
        !isSentByCurrentUserAndUnseen(lastMessage)
          ? 1
          : 0)
      );
    }, 0);
  };

  return (
    <Popover>
      <PopoverTrigger asChild className="relative max-md:hidden">
        <Button
          size="icon"
          variant="ghost"
          className="relative p-6 rounded-full"
        >
          <IconMessageCircle size={26} className="!size-6" />
          {allConversationsData?.some((conversation) => {
            const messages = Array.isArray(conversation?.expand?.messages)
              ? conversation?.expand?.messages
              : conversation?.expand?.messages
                ? [conversation?.expand?.messages]
                : [];

            const lastMessage = messages.length
              ? messages[messages.length - 1]
              : undefined;

            return (
              getUnreadMessagesCount(conversation) > 0 &&
              !isSentByCurrentUserAndUnseen(lastMessage as TMessage)
            );
          }) && (
            <span className="absolute top-1 right-1 flex items-center justify-center py-0.5 px-1.5 text-xs text-white bg-red-500 rounded-full">
              {getTotalUnreadConversations()}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[450px] mt-1 p-0 max-sm:w-[90vw] mx-3">
        <div className="flex items-center w-full border-b justify-between px-4 h-[52px]">
          <p className="font-medium text-dark-primary">Chats</p>
          <button type="button" className="text-xs">
            All
          </button>
        </div>
        <div className="flex flex-col w-full overflow-y-auto max-h-96">
          {isLoading ? (
            <div className="flex items-center justify-center h-24">
              <IconLoader2
                className="mx-auto animate-spin text-dark-primary"
                size={30}
              />
            </div>
          ) : (
            allConversationsData
              ?.filter((conv) => conv?.messages?.length !== 0)
              ?.map((conversation) => {
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
                  messages?.find((message) => message?.seen === false) !==
                  undefined;
                const isSentByCurrentUserAndUnseen =
                  lastMessage?.sender_id === userId && !lastMessage?.seen;
                return (
                  <button
                    type="button"
                    onClick={() => navigate({ to: `/chat/${conversation.id}` })}
                    key={conversation.id}
                    className={cn(
                      "flex items-center w-full gap-3 px-4 py-3 h-[72px] border-b hover:bg-light-gray",
                      (isSentByCurrentUserAndUnseen || !isUnread) &&
                        "opacity-50"
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
                      <p className="text-sm truncate max-w-80">
                        {lastMessage?.message}
                      </p>
                    </div>

                    {isUnread && !isSentByCurrentUserAndUnseen && (
                      <span className="p-1 bg-blue-500 rounded-full animate-pulse" />
                    )}
                  </button>
                );
              })
          )}

          {allConversationsData?.length === 0 && (
            <div className="flex flex-col items-center justify-center h-24">
              <IconMessageCircle size={30} className="mb-2 text-gray-400" />
              <p className="text-gray-500">No messages yet</p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NavbarMessagesDropdown;
