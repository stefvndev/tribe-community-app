import { useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { IconLoader2, IconMessageCircle } from "@tabler/icons-react";
import { useConversationsData } from "@/api/get";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AvatarIcon from "@/components/avatar/AvatarIcon";
import { pb } from "@/api/pocketbase";
import SelectedConversation from "../chat/SelectedConversation";

const NavbarMessagesDropdown = () => {
  const userId = pb.authStore.record?.id;
  const navigate = useNavigate({ from: "" });
  const [isOpen, setIsOpen] = useState(false);
  const { data: allConversationsData, isLoading } = useConversationsData(
    userId as string,
    isOpen
  );

  const { chat } = useSearch({ strict: false });

  const handlePushQueryParams = (key: string, postId: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        [key]: postId,
      }),
    });
  };

  if (chat) return <SelectedConversation />;

  return (
    <Popover
      onOpenChange={(open) => {
        setIsOpen(open);
      }}
    >
      <PopoverTrigger asChild className="max-md:hidden">
        <Button size="icon" variant="ghost" className="p-6 rounded-full">
          <IconMessageCircle size={26} className="!size-6" />
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
            allConversationsData?.map((conversation) => {
              const notYou = conversation?.expand?.users?.filter(
                (user) => user?.id !== userId
              )[0];
              const lastMessage = conversation?.expand?.last_message?.message;

              return (
                <button
                  onClick={() =>
                    handlePushQueryParams("chat", conversation?.id)
                  }
                  key={conversation.id}
                  type="button"
                  className="flex items-center w-full gap-3 px-4 py-3 h-[72px] border-b hover:bg-light-gray"
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
                    <p className="text-sm truncate max-w-80">{lastMessage}</p>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NavbarMessagesDropdown;
