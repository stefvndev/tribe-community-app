import * as React from "react";

import { cn } from "@/lib/utils";
import { IconSearch } from "@tabler/icons-react";

interface InputProps extends React.ComponentProps<"input"> {
  iconSearch?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, iconSearch = false, ...props }, ref) => {
    return (
      <div className="relative">
        {iconSearch && (
          <IconSearch
            className="text-neutral-500 absolute top-1/2 -translate-y-1/2 left-3"
            size={20}
          />
        )}
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border-neutral-200 bg-transparent px-3 py-1 !text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:file:text-neutral-50 dark:placeholder:text-neutral-400 outline-none",
            className,
            iconSearch ? "pl-10" : "pl-3"
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
