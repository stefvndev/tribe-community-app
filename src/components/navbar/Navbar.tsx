import { IconSelector } from "@tabler/icons-react";

const Navbar = () => {
  return (
    <header className="absolute top-0 left-0 right-0 w-full h-16 px-4 bg-white border-b">
      <nav className="flex items-center justify-between w-full h-full mx-auto max-w-landing">
        <div className="flex items-center gap-4">
          <h2 className="text-4xl font-bold">tribu</h2>
          <button type="button">
            <IconSelector size={26} className="text-grayout" />
          </button>
        </div>
        <button
          type="button"
          className="flex items-center justify-center px-5 py-[11px] border font-bold w-[116px] text-grayout rounded-md hover:text-black transition-opacity"
        >
          LOG IN
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
