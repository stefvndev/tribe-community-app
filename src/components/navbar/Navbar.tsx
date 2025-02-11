import { Link } from "@tanstack/react-router";
import { useLoggedState } from "@/lib/hooks/useLoggedState";
import NavDropdown from "./NavDropdown";
import Logo from "@/assets/tribe-logo.png";
import NavbarUserMenuDropdown from "./NavbarUserMenuDropdown";
// import NavbarMessagesDropdown from "./NavbarMessagesDropdown";

const Navbar = () => {
  const { isLogged } = useLoggedState();

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
            className="flex items-center justify-center px-5 py-[11px] border font-bold w-[116px] text-grayout rounded-md hover:text-black transition-opacity uppercase"
          >
            log in
          </Link>
        ) : (
          <div className="flex items-center justify-end w-32 gap-2">
            {/* <NavbarMessagesDropdown /> */}
            <NavbarUserMenuDropdown />
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
