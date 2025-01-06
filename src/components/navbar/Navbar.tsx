import { pb } from "@/api/pocketbase";
import { useLoggedState } from "@/lib/useLoggedState";
import { Link, useNavigate } from "@tanstack/react-router";
import NavDropdown from "./NavDropdown";
import Cookies from "js-cookie";

const Navbar = () => {
  const { isLogged } = useLoggedState();
  const navigate = useNavigate();

  const signOut = () => {
    navigate({ to: "/login" });
    pb.authStore.clear();
    Cookies.remove("userId");
  };

  return (
    <header className="absolute top-0 left-0 right-0 w-full h-16 px-4 bg-white border-b">
      <nav className="flex items-center justify-between w-full h-full mx-auto max-w-1075">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-4xl font-bold">
            tribe
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
