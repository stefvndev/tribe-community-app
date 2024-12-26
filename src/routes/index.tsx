import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { IconSearch } from "@tabler/icons-react";
import DiscoveryFilters from "@/components/discovery/DiscoveryFilters";

type TQueries = {
  category?: string;
  type?: string;
  price?: string;
};

export const Route = createFileRoute("/")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): TQueries => {
    return {
      category: search.category as string,
      type: search.type as string,
      price: search.price as string,
    };
  },
});

function RouteComponent() {
  return (
    <div className="w-full h-full px-4">
      <main className="flex flex-col items-center justify-center w-full py-8 mx-auto max-w-1075">
        <div className="flex flex-col items-center w-full text-center">
          <h1 className="text-[45px] font-bold text-dark-primary max-sm:leading-none">
            Discover communities
          </h1>
          <span className="flex max-sm:mt-4 items-center gap-1.5 text-xl font-medium text-dark-primary">
            <p>or</p>
            <Link
              search={{ category: "all" }}
              to="/"
              className="text-link-blue hover:underline"
            >
              create your own
            </Link>
          </span>
          <div className="w-full max-w-[650px]">
            <Input
              placeholder="Search for anything"
              className="w-full px-5 mt-8 !text-lg pl-14 font-medium bg-white h-14 !shadow-custom placeholder:opacity-90 rounded-xl border"
              icon={<IconSearch size={22} className="ml-1.5 opacity-90" />}
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full mt-14">
          <DiscoveryFilters />
          <div className="grid w-full grid-cols-3"></div>
        </div>
      </main>
    </div>
  );
}
