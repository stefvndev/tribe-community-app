import { Input } from "@/components/ui/input";
import NavbarMessagesDropdown from "./NavbarMessagesDropdown";
import NavbarNotificationsDropdown from "./NavbarNotificationsDropdown";
import NavbarUserMenuDropdown from "./NavbarUserMenuDropdown";
import NavDropdown from "./NavDropdown";
import { IconSearch } from "@tabler/icons-react";
import { useCommunityData } from "@/api/get";
import { getInitials } from "@/lib/getInitials";
import { getPocketBaseFileUrl } from "@/lib/getPocketBaseFileUrl";
import { Link, useLocation, useParams } from "@tanstack/react-router";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

const tabsList = [
  { id: 1, name: "Community", url: "/$id" },
  { id: 2, name: "Classroom", url: "/$id/classroom" },
  { id: 3, name: "Calendar", url: "/$id/calendar" },
  { id: 4, name: "Members", url: "/$id/members" },
  { id: 5, name: "About", url: "/$id/about" },
];

const getSelectedTab = (pathname: string, id: string) => {
  const basePath = pathname.split(`/${id}/`)[1];
  return basePath || "Community".toLowerCase();
};

const CommunityNavbar = () => {
  const { id } = useParams({ strict: false });
  const { data, isLoading } = useCommunityData(id as string);
  const location = useLocation();
  const selectedTab = getSelectedTab(location.pathname, id || "");

  return (
    <header className="absolute top-0 left-0 right-0 flex flex-col w-full h-32 px-4 bg-white border-b">
      <nav className="flex items-center justify-between w-full h-full mx-auto max-w-1075">
        <div className="flex items-center gap-4">
          {!isLoading ? (
            <div className="flex items-center gap-4">
              {data?.avatar ? (
                <img
                  className="object-cover rounded-lg min-w-10 min-h-10 size-10"
                  src={getPocketBaseFileUrl({
                    recordId: data?.id,
                    filename: data?.avatar,
                    collectionName: data?.collectionName,
                  })}
                />
              ) : (
                <div className="flex items-center justify-center font-medium rounded-lg bg-light-gray min-w-10 min-h-10 size-10">
                  <p>{getInitials(data?.name as string)}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Skeleton className="w-10 min-h-10 min-w-10" />
              <Skeleton className="h-5 w-28" />
            </div>
          )}
          {!isLoading && (
            <h1 className="w-full text-lg font-medium truncate text-dark-primary whitespace-nowrap max-w-52">
              {data?.name}
            </h1>
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
        <div className="flex items-center gap-2">
          <NavbarMessagesDropdown />
          <NavbarNotificationsDropdown />
          <NavbarUserMenuDropdown />
        </div>
      </nav>
      <div className="flex items-center w-full h-full mx-auto max-w-1075">
        <ul className="flex items-center w-full gap-8">
          {tabsList.map((item) => (
            <li key={item.id}>
              <Link
                className={cn(
                  "text-base font-medium text-grayout transition-all ease-out hover:text-dark-primary",
                  selectedTab === item.name.toLowerCase() && "text-dark-primary"
                )}
                to={item.url}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default CommunityNavbar;
