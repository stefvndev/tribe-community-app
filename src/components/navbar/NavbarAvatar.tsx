import { getInitials } from "@/lib/getInitials";
import { getPocketBaseFileUrl } from "@/lib/getPocketBaseFileUrl";

const NavbarAvatar = ({
  avatar,
  name,
  id,
  collectionName,
}: {
  avatar?: string;
  name: string;
  id: string;
  collectionName: string;
}) => {
  return avatar ? (
    <img
      className="object-cover rounded-lg min-w-10 min-h-10 size-10"
      src={getPocketBaseFileUrl({
        recordId: id,
        filename: avatar,
        collectionName,
      })}
      alt="avatar"
    />
  ) : (
    <div className="flex items-center justify-center font-medium rounded-lg bg-light-gray min-w-10 min-h-10 size-10">
      <p>{getInitials(name)}</p>
    </div>
  );
};

export default NavbarAvatar;
