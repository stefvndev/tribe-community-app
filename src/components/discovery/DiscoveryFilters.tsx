import { useCallback, useMemo, useState } from "react";
import DiscoveryFilterByPriceAndType from "./DiscoveryFilterByPriceAndType";
import { discoveryFiltersData } from "./discoveryFiltersData";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Route } from "@/routes";
import { cn } from "@/lib/utils";
import { TDiscoveryQueries } from "@/types/types";

const DiscoveryFilters = () => {
  const [showAllFilters, setShowAllFIlters] = useState(false);
  const navigate = useNavigate({ from: Route.fullPath });
  const { category } = useSearch({ from: Route.fullPath });

  const filtersList = useMemo(
    () =>
      showAllFilters
        ? discoveryFiltersData
        : discoveryFiltersData?.filter((item) => item.id <= 6),
    [showAllFilters]
  );

  const handleShowHideFilters = useCallback(() => {
    setShowAllFIlters((prev) => !prev);
  }, []);

  const handlePushQuery = useCallback(
    (name: keyof TDiscoveryQueries, value: unknown) => {
      navigate({
        search: (prev) => {
          const newSearch = { ...prev } as TDiscoveryQueries;
          if (name === "category" && value === "all") {
            delete newSearch[name];
          } else {
            newSearch[name] = value as string;
          }
          return newSearch;
        },
      });
    },
    [navigate]
  );

  return (
    <div className="flex items-center justify-between w-full max-sm:flex-col-reverse max-sm:gap-4">
      <div className="flex flex-wrap items-center w-full gap-2">
        {filtersList.map((item) => (
          <button
            data-testid={`filter-button-${item.query}`}
            type="button"
            className={cn(
              "h-10 flex items-center gap-2 text-sm bg-white border rounded-full text-grayout w-fit px-[14px] hover:text-white transition-all ease-in-out hover:bg-dark-gray",
              category === item.query && "text-white bg-dark-gray",
              !category && item.query === "all" && "text-white bg-dark-gray"
            )}
            key={item.id}
            onClick={() => handlePushQuery("category", item.query)}
          >
            <>{item.icon}</>
            <p>{item.name}</p>
          </button>
        ))}
        {showAllFilters && (
          <button
            type="button"
            className="h-10 flex items-center gap-2 text-sm bg-white border rounded-full text-grayout w-fit px-[14px] hover:text-white transition-all ease-in-out hover:bg-dark-gray active:bg-dark-gray active:text-white"
            onClick={handleShowHideFilters}
          >
            <p>Less...</p>
          </button>
        )}
      </div>
      <div className="flex items-center gap-2 self-baseline">
        {!showAllFilters && (
          <button
            onClick={handleShowHideFilters}
            className="h-10 text-sm bg-white border rounded-full text-grayout w-fit px-[14px] hover:text-white transition-all ease-in-out hover:bg-dark-gray"
            type="button"
          >
            More...
          </button>
        )}
        <DiscoveryFilterByPriceAndType />
      </div>
    </div>
  );
};

export default DiscoveryFilters;
