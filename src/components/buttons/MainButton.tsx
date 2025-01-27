import { cn } from "@/lib/utils";

type MainButtonProps = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
};

const MainButton = ({
  children,
  className,
  disabled,
  type = "button",
  onClick,
}: MainButtonProps) => {
  return (
    <button
      data-testid="submit-button"
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={cn(
        "flex items-center justify-center gap-1 px-4 font-bold uppercase border rounded-md h-11 bg-yellow-primary text-dark-primary hover:bg-yellow-primary-hover  disabled:bg-light-gray disabled:text-gray-500",
        className
      )}
    >
      {children}
    </button>
  );
};

export default MainButton;
