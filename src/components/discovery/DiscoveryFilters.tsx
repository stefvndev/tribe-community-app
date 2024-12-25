import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import discoveryFiltersData from "./discoveryFiltersData";
import { useState } from "react";

const DiscoveryFilters = () => {
  const [showAllFilters, setShowAllFIlters] = useState(false);

  const filtersList = showAllFilters
    ? discoveryFiltersData
    : discoveryFiltersData?.filter((item) => item.id <= 6);

  const handleShowHideFilters = () => {
    setShowAllFIlters(!showAllFilters);
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-wrap items-center w-full gap-2">
        {filtersList.map((item) => (
          <button
            type="button"
            className="h-10 flex items-center gap-2 text-sm bg-white border rounded-full text-grayout w-fit px-[14px] hover:text-white transition-all ease-in-out hover:bg-dark-gray active:bg-dark-gray active:text-white"
            key={item.id}
            onClick={() => console.log(item.query)}
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
        <button
          className="h-10 text-sm bg-white border rounded-full text-grayout w-fit px-[14px] hover:text-white transition-all ease-in-out hover:bg-dark-gray flex items-center gap-1.5"
          type="button"
        >
          Filter
          <IconAdjustmentsHorizontal size={18} />
        </button>
      </div>
    </div>
  );
};

export default DiscoveryFilters;
