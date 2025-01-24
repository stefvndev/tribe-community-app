import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

const TABS = [
  { id: 1, name: "Community", url: "/$id" },
  // { id: 2, name: "Classroom", url: "/$id/classroom" },
  { id: 3, name: "Calendar", url: "/$id/calendar" },
  { id: 4, name: "Members", url: "/$id/members" },
  { id: 5, name: "About", url: "/$id/about" },
];

const NavbarTabs = ({ selectedTab }: { selectedTab: string }) => (
  <ul className="flex items-center w-full h-full gap-8 scrollbar-hide whitespace-nowrap max-md:overflow-x-auto">
    {TABS.map((tab) => (
      <li key={tab.id} className="relative">
        <Link
          className={cn(
            "text-base font-medium text-grayout transition-all ease-out hover:text-dark-primary",
            selectedTab === tab.name.toLowerCase() && "text-dark-primary"
          )}
          to={tab.url}
        >
          {tab.name}
        </Link>
        <hr
          className={cn(
            "absolute w-full bg-none h-1 hidden -bottom-[15px]",
            selectedTab === tab.name.toLowerCase() && "bg-dark-primary flex"
          )}
        ></hr>
      </li>
    ))}
  </ul>
);

export default NavbarTabs;
