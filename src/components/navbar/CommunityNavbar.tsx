import { IconSearch } from "@tabler/icons-react";
import { Link, useLocation, useParams } from "@tanstack/react-router";
import { useCommunityData } from "@/api/get";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Skeleton } from "../ui/skeleton";
import NavbarAvatar from "./NavbarAvatar";
import NavbarMessagesDropdown from "./NavbarMessagesDropdown";
import NavbarNotificationsDropdown from "./NavbarNotificationsDropdown";
import NavbarTabs from "./NavbarTabs";
import NavbarUserMenuDropdown from "./NavbarUserMenuDropdown";
import NavDropdown from "./NavDropdown";
import { useLoggedState } from "@/lib/useLoggedState";
import Logo from "@/assets/tribe-logo.png";

const getSelectedTab = (pathname: string, id: string) => {
  const basePath = pathname.split(`/${id}/`)[1];
  return basePath || "community";
};

const CommunityNavbar = () => {
  const { id } = useParams({ strict: false });
  const { data, isLoading } = useCommunityData(id as string);
  const { isLogged } = useLoggedState();
  const location = useLocation();
  const selectedTab = getSelectedTab(location.pathname, id || "");

  return (
    <header
      className={cn(
        "absolute top-0 left-0 right-0 flex flex-col w-full px-4 bg-white border-b",
        id && isLogged() ? "h-28 pt-2" : "h-16"
      )}
    >
      <nav className="flex items-center justify-between w-full h-full mx-auto max-w-1075">
        <div className="flex items-center gap-4 max-w-72">
          {id ? (
            <div className="flex items-center gap-4">
              {!isLoading ? (
                <>
                  <NavbarAvatar
                    avatar={data?.avatar}
                    name={data?.name || ""}
                    id={data?.id || ""}
                    collectionName={data?.collectionName || ""}
                  />
                  <h1 className="w-full text-lg font-medium truncate text-dark-primary">
                    {data?.name}
                  </h1>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <Skeleton className="w-10 h-10" />
                  <Skeleton className="h-5 w-28" />
                </div>
              )}
            </div>
          ) : (
            <Link to="/" className="text-4xl font-bold">
              <img src={Logo} alt="Tribe" width={220} />
            </Link>
          )}
          <NavDropdown />
        </div>
        <div className="items-center w-full mx-4">
          <Input
            icon={<IconSearch size={20} />}
            className="h-12 bg-light-gray placeholder:text-grayout !text-base"
            placeholder="Search"
          />
        </div>
        {isLogged() ? (
          <div className="flex items-center w-40 gap-2">
            <NavbarMessagesDropdown />
            <NavbarNotificationsDropdown />
            <NavbarUserMenuDropdown />
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center justify-center px-5 py-[11px] border font-bold w-[116px] text-grayout rounded-md hover:text-black transition-opacity uppercase whitespace-nowrap"
          >
            log in
          </Link>
        )}
      </nav>
      {id && isLogged() && (
        <div className="flex items-center w-full h-full mx-auto max-w-1075">
          <NavbarTabs selectedTab={selectedTab} />
        </div>
      )}
    </header>
  );
};

export default CommunityNavbar;
