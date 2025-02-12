import { Link } from "@tanstack/react-router";
import { useLoggedState } from "@/lib/hooks/useLoggedState";
import NavDropdown from "./NavDropdown";
import Logo from "@/assets/tribe-logo.png";
import NavbarUserMenuDropdown from "./NavbarUserMenuDropdown";
import NavbarMessagesDropdown from "./NavbarMessagesDropdown";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { mobileMenuLinks } from "./mobileMenuLinks";
import useUserStore from "@/store/UserStore";
import useSignOut from "@/lib/hooks/useSignOut";

const Navbar = () => {
  const { userId } = useUserStore();
  const { isLogged } = useLoggedState();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { signOut } = useSignOut();

  const handleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const profileUrl = (link: { name: string; url: string }) =>
    link.name === "Profile" ? `${link.url}/${userId}` : `${link.url}`;

  return (
    <header className="fixed top-0 left-0 right-0 w-full h-16 px-4 bg-white border-b z-[100]">
      <nav className="flex items-center justify-between w-full h-full mx-auto max-w-1075">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-4xl font-bold">
            <img src={Logo} alt="Tribe" width={120} height={44} />
          </Link>
          <NavDropdown />
        </div>
        {!isLogged() ? (
          <Link
            to="/login"
            className="flex max-md:hidden items-center justify-center px-5 py-[11px] border font-bold w-[116px] text-grayout rounded-md hover:text-black transition-opacity uppercase"
          >
            log in
          </Link>
        ) : (
          <div className="flex items-center justify-end w-32 gap-2">
            <NavbarMessagesDropdown />
            <NavbarUserMenuDropdown />
          </div>
        )}
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
      {/* mobile menu */}
      <div
        className={cn(
          "absolute h-[calc(100dvh-64px)] flex flex-col w-full bg-white top-16 transition-all ease-in-out z-50 duration-300",
          isMobileMenuOpen ? "left-0" : "-left-full"
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
      </div>
    </header>
  );
};

export default Navbar;
