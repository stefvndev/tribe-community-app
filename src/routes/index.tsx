import {
  createFileRoute,
  useNavigate,
  useSearch,
  Link,
} from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { IconSearch } from "@tabler/icons-react";
import DiscoveryFilters from "@/components/discovery/DiscoveryFilters";
import AppLayout from "@/components/layout/AppLayout";
import CommunitiesList from "@/components/home/CommunitiesList";
import { TDiscoveryQueries } from "@/types/types";

export const Route = createFileRoute("/")({
  component: () => (
    <AppLayout>
      <RouteComponent />
    </AppLayout>
  ),
  validateSearch: (search: Record<string, unknown>): TDiscoveryQueries => {
    return {
      category: search.category as string,
      type: search.type as string,
      price: search.price as string,
      search: search.search as string,
      chat: search.chat as string,
    };
  },
});

function RouteComponent() {
  const navigate = useNavigate({ from: Route.fullPath });
  const { search } = useSearch({ from: Route.fullPath });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    navigate({
      search: (prev) => {
        const newSearch = { ...prev } as TDiscoveryQueries;
        if (value) {
          newSearch.search = value;
        } else {
          delete newSearch.search;
        }
        return newSearch;
      },
    });
  };

  return (
    <main className="flex flex-col items-center justify-center w-full py-8 mx-auto max-w-1075">
      <div className="flex flex-col items-center w-full text-center">
        <h1 className="text-[45px] font-bold text-dark-primary max-sm:leading-none">
          Discover communities
        </h1>
        <span className="flex max-sm:mt-4 items-center gap-1.5 text-xl font-medium text-dark-primary">
          <p>or</p>
          <Link
            data-testid="create-community-link"
            to="/create-community"
            className="text-link-blue hover:underline"
          >
            create your own
          </Link>
        </span>
        <div className="w-full max-w-[650px] relative">
          <Input
            data-testid="search-input"
            defaultValue={search}
            onChange={handleSearch}
            placeholder="Search for anything"
            className="w-full px-5 mt-8 !text-lg pl-14 font-medium bg-white h-14 !shadow-custom placeholder:opacity-90 rounded-xl border"
            icon={<IconSearch size={22} className="ml-1.5 opacity-90" />}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-7 mt-14 max-md:mt-8">
        <DiscoveryFilters />
        <CommunitiesList />
      </div>
    </main>
  );
}
