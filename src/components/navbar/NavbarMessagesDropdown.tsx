import { useConversationsData } from "@/api/get";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IconMessageCircle } from "@tabler/icons-react";
import AvatarIcon from "../avatar/AvatarIcon";
import { pb } from "@/api/pocketbase";

const NavbarMessagesDropdown = () => {
  const userId = pb.authStore.record?.id;
  const { data: allConversationsData } = useConversationsData(userId as string);

  return (
    <Popover>
      <PopoverTrigger asChild>
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
          {allConversationsData?.map((conversation) => {
            const notYou = conversation?.expand?.users?.filter(
              (user) => user?.id !== userId
            )[0];
            const lastMessage = conversation?.expand?.last_message?.message;

            return (
              <button
                onClick={() => console.log(conversation.id)}
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
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NavbarMessagesDropdown;
