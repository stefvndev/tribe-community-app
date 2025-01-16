import { useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { IconSearch, IconX } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";

type TQueries = {
  searchTerm?: string;
};

const NavPostSearch = () => {
  const navigate = useNavigate({ from: "/$id" });
  const { searchTerm } = useSearch({ strict: false });

  const [inputValue, setInputValue] = useState(searchTerm || "");

  const handlePushQueryParams = (key: keyof TQueries, value: string | null) => {
    navigate({
      search: (prev) => {
        const newSearch = { ...prev } as TQueries;
        if (value === null) {
          delete newSearch[key];
        } else {
          newSearch[key] = value;
        }
        return newSearch;
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue?.trim() === "") {
      return handlePushQueryParams("searchTerm", null);
    }
    handlePushQueryParams("searchTerm", inputValue);
  };

  const handleClearSearch = () => {
    setInputValue("");
    handlePushQueryParams("searchTerm", null);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        icon={<IconSearch size={20} />}
        className="h-12 bg-light-gray placeholder:text-grayout !text-base"
        placeholder="Search"
      />
      {searchTerm && (
        <button
          onClick={handleClearSearch}
          type="button"
          className="absolute p-2 -translate-y-1/2 rounded-lg right-3 top-1/2 bg-yellow-primary hover:bg-yellow-primary-hover"
        >
          <IconX size={18} />
        </button>
      )}
    </form>
  );
};

export default NavPostSearch;
