import { useGetUserData } from "@/api/get";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getInitials } from "@/lib/getInitials";
import { getPocketBaseFileUrl } from "@/lib/getPocketBaseFileUrl";
import { Link } from "@tanstack/react-router";
import { Skeleton } from "../ui/skeleton";
import useSignOut from "@/lib/useSignOut";
import { pb } from "@/api/pocketbase";

const mainLinks = [
  {
    id: 1,
    name: "Profile",
    url: "/profile",
  },
  {
    id: 2,
    name: "Settings",
    url: "/settings",
  },
];

const secondaryLinks = [
  {
    id: 1,
    name: "Create a community",
    url: "/create-community",
  },
  {
    id: 2,
    name: "Discover communities",
    url: "/",
  },
];

const NavbarUserMenuDropdown = () => {
  const userId = pb.authStore.record?.id;
  const { data, isLoading } = useGetUserData(userId as string);
  const { signOut } = useSignOut();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost" className="p-6 rounded-full">
          {!isLoading ? (
            <>
              {data?.avatar ? (
                <img
                  src={getPocketBaseFileUrl({
                    recordId: data?.id,
                    filename: data?.avatar,
                    collectionName: data?.collectionName,
                  })}
                  className="object-cover rounded-full size-9 min-h-9 min-w-9"
                />
              ) : (
                <div className="flex items-center justify-center font-medium rounded-full min-h-9 min-w-9 bg-light-gray size-9">
                  <p>{getInitials(data?.name as string)}</p>
                </div>
              )}
            </>
          ) : (
            <Skeleton className="rounded-full size-9 min-w-9 min-h-9" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col items-center w-56 px-0 mt-1 mr-4">
        <p className="self-center w-full px-4 font-bold truncate">
          {data?.email}
        </p>
        <hr className="w-full mt-4 mb-1" />
        <div className="flex flex-col w-full">
          {mainLinks.map((link) => (
            <div key={link.id} className="flex flex-col w-full">
              <Link
                to={link.url}
                className="flex items-center p-4 transition-all ease-in-out hover:bg-light-gray"
              >
                <p className="font-bold text-dark-primary">{link.name}</p>
              </Link>
            </div>
          ))}
        </div>
        <hr className="w-full my-1" />
        <div className="flex flex-col w-full">
          {secondaryLinks.map((link) => (
            <div key={link.id} className="flex flex-col w-full">
              <Link
                to={link.url}
                className="flex items-center p-4 transition-all ease-in-out text-grayout hover:text-dark-primary hover:bg-light-gray"
              >
                <p className="font-medium">{link.name}</p>
              </Link>
            </div>
          ))}
          <button
            type="button"
            onClick={signOut}
            className="flex items-center p-4 text-red-500 transition-all ease-in-out hover:text-red-600 hover:bg-light-gray"
          >
            <p className="font-medium">Sign out</p>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NavbarUserMenuDropdown;
