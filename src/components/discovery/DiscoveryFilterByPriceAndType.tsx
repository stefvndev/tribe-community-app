import { useNavigate, useSearch } from "@tanstack/react-router";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import {
  discoveryFiltersPrice,
  discoveryFiltersTypes,
} from "./discoveryFiltersData";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Route } from "@/routes";
import { useEffect, useState } from "react";
import { ECommunityPrice, ECommunityType } from "@/enums/enums";
import { TDiscoveryQueries } from "@/types/types";
import { cn } from "@/lib/utils";

const DiscoveryFilterByPriceAndType = () => {
  const navigate = useNavigate({ from: Route.fullPath });
  const { type, price } = useSearch({ from: Route.fullPath });

  const [selectedType, setSelectedType] = useState<string>(
    type || ECommunityType.ALL
  );
  const [selectedPrice, setSelectedPrice] = useState<string>(
    price || ECommunityPrice.ALL
  );

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedType(value);
    handlePushQuery("type", value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedPrice(value);
    handlePushQuery("price", value);
  };

  useEffect(() => {
    setSelectedType(type || ECommunityType.ALL);
    setSelectedPrice(price || ECommunityPrice.ALL);
  }, [type, price]);

  const handlePushQuery = (name: keyof TDiscoveryQueries, value: unknown) => {
    navigate({
      search: (prev) => {
        const newSearch = { ...prev } as TDiscoveryQueries;
        if ((name === "type" || name === "price") && value === "all") {
          delete newSearch[name];
        } else {
          newSearch[name] = value as string;
        }
        return newSearch;
      },
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "h-10 text-sm bg-white border rounded-full text-grayout w-fit px-[14px] hover:text-white transition-all ease-in-out hover:bg-dark-gray flex items-center gap-1.5",
            (type || price) && "text-white bg-dark-gray"
          )}
          type="button"
        >
          Filter
          <IconAdjustmentsHorizontal size={18} />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="p-6 w-[376px] max-sm:w-[300px] max-sm:ml-4 h-44 shadow-custom rounded-xl"
      >
        <div className="flex w-full h-full">
          <div className="flex flex-col w-1/2 h-full pr-6 border-r border-black/20">
            <label className="mb-4 text-base font-medium text-dark-primary">
              Type
            </label>
            <form className="flex flex-col items-start gap-2">
              {discoveryFiltersTypes?.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    checked={selectedType === item.name}
                    onChange={handleTypeChange}
                    value={item.name}
                    name="filterType"
                    type="radio"
                    className="text-base cursor-pointer size-6 text-dark-primary"
                  />
                  <p className="capitalize">{item.name}</p>
                </label>
              ))}
            </form>
          </div>
          <div className="flex flex-col w-1/2 pl-6">
            <label className="mb-4 text-base font-medium text-dark-primary">
              Price
            </label>
            <form className="flex flex-col items-start gap-2">
              {discoveryFiltersPrice?.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    checked={selectedPrice === item.name}
                    onChange={handlePriceChange}
                    value={item.name}
                    name="filterPrice"
                    type="radio"
                    className="text-base cursor-pointer size-6 text-dark-primary"
                  />
                  <p className="capitalize">{item.name}</p>
                </label>
              ))}
            </form>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DiscoveryFilterByPriceAndType;
