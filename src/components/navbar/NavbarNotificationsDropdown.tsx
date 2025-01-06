import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IconBell } from "@tabler/icons-react";

const NavbarNotificationsDropdown = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost" className="p-6 rounded-full">
          <IconBell size={26} className="!size-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[310px] mt-1 px-0 mr-4"></PopoverContent>
    </Popover>
  );
};

export default NavbarNotificationsDropdown;
