import NavDropdown from "./NavDropdown";
import { Link } from "@tanstack/react-router";

const Navbar = () => {
  return (
    <header className="absolute top-0 left-0 right-0 w-full h-16 px-4 bg-white border-b">
      <nav className="flex items-center justify-between w-full h-full mx-auto max-w-1075">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-4xl font-bold">
            tribe
          </Link>
          <NavDropdown />
        </div>
        <Link
          to="/login"
          className="flex items-center justify-center px-5 py-[11px] border font-bold w-[116px] text-grayout rounded-md hover:text-black transition-opacity"
        >
          LOG IN
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
