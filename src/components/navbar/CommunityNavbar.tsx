import { useState } from "react";
import { Link, useLocation, useParams } from "@tanstack/react-router";
import useCommunityStore from "@/store/CommunityStore";
import useUserStore from "@/store/UserStore";
import { useLoggedState } from "@/lib/hooks/useLoggedState";
import Logo from "@/assets/tribe-logo.png";
import AvatarIcon from "@/components/avatar/AvatarIcon";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { mobileMenuLinks } from "./mobileMenuLinks";
import NavbarMessagesDropdown from "./NavbarMessagesDropdown";
import NavbarTabs from "./NavbarTabs";
import NavbarUserMenuDropdown from "./NavbarUserMenuDropdown";
import NavDropdown from "./NavDropdown";
import NavPostSearch from "./NavPostSearch";
import useSignOut from "@/lib/hooks/useSignOut";

const getSelectedTab = (pathname: string, id: string) => {
  const basePath = pathname.split(`/${id}/`)[1];
  return basePath || "community";
};

const CommunityNavbar = () => {
  const { userId } = useUserStore();
  const { id } = useParams({ strict: false });
  const { data, isLoading } = useCommunityStore();
  const { isLogged } = useLoggedState();
  const location = useLocation();
  const selectedTab = getSelectedTab(location.pathname, id || "");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { signOut } = useSignOut();

  const profileUrl = (link: { name: string; url: string }) =>
    link.name === "Profile" ? `${link.url}/${userId}` : `${link.url}`;

  const handleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 flex flex-col w-full px-4 bg-white border-b",
        id && isLogged() ? "h-28 pt-2" : "h-16"
      )}
    >
      <nav className="flex items-center justify-between w-full h-full mx-auto max-w-1075">
        <div className="flex items-center gap-4 max-w-72">
          {id ? (
            <div className="flex items-center gap-4">
              {!isLoading ? (
                <>
                  <AvatarIcon
                    avatar={data?.avatar}
                    name={data?.name || ""}
                    id={data?.id || ""}
                    collectionName={data?.collectionName || ""}
                  />
                  <h1
                    data-testid="community-name"
                    className="w-full text-lg font-medium truncate text-dark-primary"
                  >
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
          <div className="max-md:hidden">
            <NavDropdown />
          </div>
        </div>

        <div className="flex items-center w-full gap-4">
          <div className="items-center w-full ml-4 max-md:hidden">
            {selectedTab === "community" && <NavPostSearch />}
          </div>
          {isLogged() ? (
            <div className="flex items-center justify-end w-32 gap-2">
              <NavbarMessagesDropdown />
              <NavbarUserMenuDropdown />
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center max-md:hidden justify-center px-5 py-[11px] border font-bold min-w-[116px] text-grayout rounded-md hover:text-black transition-opacity uppercase whitespace-nowrap"
            >
              log in
            </Link>
          )}
        </div>

        {/* mobile menu button */}
        <button
          onClick={handleMobileMenu}
          type="button"
          className="hidden max-md:flex"
        >
          {isMobileMenuOpen ? (
            <IconX size={28} className="text-dark-primary" />
          ) : (
            <IconMenu2 size={28} className="text-dark-primary" />
          )}
        </button>
      </nav>

      {id && isLogged() && (
        <div className="flex items-center w-full h-full mx-auto max-w-1075">
          <NavbarTabs selectedTab={selectedTab} />
        </div>
      )}

      {/* mobile menu */}
      <nav
        className={cn(
          "absolute flex flex-col w-full bg-white transition-all ease-in-out z-50 duration-300",
          isMobileMenuOpen ? "left-0" : "-left-full",
          isLogged()
            ? "top-28 h-[calc(100dvh-112px)]"
            : "top-16 h-[calc(100dvh-64px)]"
        )}
      >
        <ul className="flex flex-col w-full h-full">
          {!isLogged() ? (
            <li className="flex w-full">
              <Link
                to="/login"
                className="flex items-center w-full px-4 font-medium h-14 text-dark-primary hover:bg-light-gray"
              >
                <p>Login</p>
              </Link>
            </li>
          ) : (
            <div className="flex flex-col">
              {mobileMenuLinks.map((link) => (
                <li key={link.id} className="flex w-full">
                  <Link
                    onClick={handleMobileMenu}
                    to={profileUrl(link)}
                    className="flex items-center w-full px-4 font-medium h-14 text-dark-primary hover:bg-light-gray"
                  >
                    <p>{link.name}</p>
                  </Link>
                </li>
              ))}
              <li className="flex w-full">
                <Link
                  onClick={signOut}
                  to="/login"
                  className="flex items-center w-full px-4 font-medium text-red-500 h-14 hover:bg-light-gray"
                >
                  <p>Sign out</p>
                </Link>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default CommunityNavbar;
