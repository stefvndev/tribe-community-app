import { getInitials } from "@/lib/getInitials";
import { getPocketBaseFileUrl } from "@/lib/getPocketBaseFileUrl";
import { cn } from "@/lib/utils";

const AvatarIcon = ({
  avatar,
  name,
  id,
  collectionName,
  className,
}: {
  avatar?: string;
  name: string;
  id: string;
  collectionName: string;
  className?: string;
}) => {
  return avatar ? (
    <img
      className={cn(
        "object-cover rounded-lg min-w-10 min-h-10 size-10",
        className
      )}
      src={getPocketBaseFileUrl({
        recordId: id,
        filename: avatar,
        collectionName,
      })}
      alt="avatar"
    />
  ) : (
    <div
      className={cn(
        "flex items-center justify-center font-medium rounded-lg bg-light-gray min-w-10 min-h-10 size-10",
        className
      )}
    >
      <p>{getInitials(name)}</p>
    </div>
  );
};

export default AvatarIcon;
