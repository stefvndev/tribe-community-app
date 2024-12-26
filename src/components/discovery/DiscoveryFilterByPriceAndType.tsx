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

const DiscoveryFilterByPriceAndType = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="h-10 text-sm bg-white border rounded-full text-grayout w-fit px-[14px] hover:text-white transition-all ease-in-out hover:bg-dark-gray flex items-center gap-1.5"
          type="button"
        >
          Filter
          <IconAdjustmentsHorizontal size={18} />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="p-6 w-[376px] h-44 shadow-custom rounded-xl"
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
