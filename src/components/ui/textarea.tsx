import * as React from "react";
import { cn } from "@/lib/utils";
import InputErrorMessage from "../errorMessage/InputErrorMessage";

interface TextAreaProps extends React.ComponentProps<"textarea"> {
  hasError?: boolean;
  errorMessage?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, hasError, errorMessage, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <textarea
          className={cn(
            "flex min-h-[60px] w-full rounded-md border border-neutral-200 bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 outline-none",
            hasError && "border-red-500",
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

Textarea.displayName = "Textarea";

export default Textarea;
