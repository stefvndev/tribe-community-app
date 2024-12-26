import { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  IconBrandSafari,
  IconPlus,
  IconSearch,
  IconSelector,
} from "@tabler/icons-react";
import { Input } from "@/components/ui/input";

type TLinks = {
  id: number;
  name: string;
  url: string;
  icon: ReactNode;
};

const links: TLinks[] = [
  {
    id: 1,
    name: " Create a community",
    url: "/create-community",
    icon: <IconPlus size={24} className="bg-light-gray text-neutral-500" />,
  },
  {
    id: 2,
    name: "Discover communities",
    url: "/",
    icon: (
      <IconBrandSafari size={24} className="bg-light-gray text-neutral-500" />
    ),
  },
];

const NavDropdown = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost" className="p-6 rounded-full">
          <IconSelector size={26} className="!size-7" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[310px] mt-1 px-0 ml-14">
        <div className="flex flex-col w-full">
          <div className="w-full px-4">
            <Input
              icon={<IconSearch size={20} />}
              type="text"
              placeholder="Search"
              className="h-10 bg-light-gray !text-base rounded-xl"
            />
          </div>

          {/* Change button to link later 👇🏼 */}
          {links.map((link) => (
            <div key={link.id} className="w-full flex flex-col mt-1.5">
              <Link
                to={link.url}
                className="flex items-center gap-2 p-4 transition-all ease-in-out hover:bg-light-gray"
              >
                <div className="flex items-center justify-center size-10 rounded-xl bg-light-gray">
                  {link.icon}
                </div>
                <p className="text-lg font-medium text-dark-primary">
                  {link.name}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NavDropdown;
