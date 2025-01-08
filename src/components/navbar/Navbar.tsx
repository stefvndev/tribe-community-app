import { Link } from "@tanstack/react-router";
import { useLoggedState } from "@/lib/useLoggedState";
import useSignOut from "@/lib/useSignOut";
import NavDropdown from "./NavDropdown";
import Logo from "@/assets/tribe-logo.png";

const Navbar = () => {
  const { isLogged } = useLoggedState();
  const { signOut } = useSignOut();

  return (
    <header className="absolute top-0 left-0 right-0 w-full h-16 px-4 bg-white border-b">
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
          <button
            type="button"
            onClick={signOut}
            className="flex items-center justify-center px-5 py-[11px] border font-bold w-[116px] text-grayout rounded-md hover:text-black transition-opacity uppercase"
          >
            sign out
          </button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
