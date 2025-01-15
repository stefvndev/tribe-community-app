import * as React from "react";

import { cn } from "@/lib/utils";
import InputErrorMessage from "../errorMessage/InputErrorMessage";

interface InputProps extends React.ComponentProps<"input"> {
  icon?: React.ReactNode;
  hasError?: boolean;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, hasError, errorMessage, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <div className="absolute -translate-y-1/2 text-neutral-500 top-1/2 left-3">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border-neutral-200 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:file:text-neutral-50 dark:placeholder:text-neutral-400 outline-none",
            icon ? "pl-10" : "pl-3",
            hasError && "!border-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        <InputErrorMessage error={hasError} message={errorMessage} />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
