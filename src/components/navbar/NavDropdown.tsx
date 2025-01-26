import { useListOfAllCommunities } from "@/api/get";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import useUserStore from "@/store/UserStore";
import {
  IconBrandSafari,
  IconPlus,
  IconSearch,
  IconSelector,
} from "@tabler/icons-react";
import { Link, useParams } from "@tanstack/react-router";
import { ReactNode, useMemo, useState } from "react";
import AvatarIcon from "../avatar/AvatarIcon";

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
  const { id: communityId } = useParams({ strict: false });
  const { userId } = useUserStore();
  const { data } = useListOfAllCommunities();
  const usersCommunities = data?.filter((item) =>
    item?.members?.includes(userId as string)
  );

  const [searchCommunity, setSearchCommunity] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCommunity(e?.target?.value);
  };

  const filteredCommunities = useMemo(() => {
    return usersCommunities?.filter((community) =>
      community?.name?.toLowerCase()?.includes(searchCommunity.toLowerCase())
    );
  }, [usersCommunities, searchCommunity]);

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
              onChange={(e) => handleSearch(e)}
              icon={<IconSearch size={20} />}
              type="text"
              placeholder="Search"
              className="h-10 bg-light-gray !text-base rounded-xl"
            />
          </div>

          <div className="flex flex-col w-full max-h-[500px] overflow-y-auto">
            {links.map((link) => (
              <div key={link.id} className="flex flex-col w-full mt-1">
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
            {filteredCommunities?.map((community) => (
              <div key={community.id} className="flex flex-col w-full mt-1">
                <Link
                  to={`/${community.id}`}
                  className={cn(
                    "flex items-center gap-2 p-4 transition-all ease-in-out hover:bg-light-gray",
                    communityId === community?.id &&
                      "bg-yellow-primary hover:bg-yellow-primary-hover"
                  )}
                >
                  <AvatarIcon
                    avatar={community?.avatar}
                    name={community?.name || ""}
                    id={community?.id || ""}
                    collectionName={community?.collectionName || ""}
                    className="rounded-lg size-10"
                  />
                  <p className="text-lg font-medium truncate text-dark-primary">
                    {community.name}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NavDropdown;
