import { Link } from "@tanstack/react-router";
import { getInitials } from "@/lib/getInitials";
import { getPocketBaseFileUrl } from "@/lib/getPocketBaseFileUrl";
import { TCommunities } from "@/types/types";

type TCommunityCard = {
  item: TCommunities;
  communityRedirection: (
    members: string[]
  ) => "/$id/preview" | "/$id/about" | "/$id";
};

const CommunityCard = ({ item, communityRedirection }: TCommunityCard) => {
  return (
    <Link
      data-testid={`community-card-${item?.name?.toLowerCase().replace(/\s+/g, "-")}`}
      to={communityRedirection(item?.members)}
      params={{
        id: item?.id,
      }}
      className="flex bg-white flex-col w-full overflow-hidden max-lg:max-w-full border max-w-[335px] h-96 rounded-xl hover:shadow-custom"
    >
      {item?.banner ? (
        <img
          className="w-full h-[177px] object-cover"
          src={getPocketBaseFileUrl({
            recordId: item?.id,
            filename: item?.banner,
            collectionName: item?.collectionName,
          })}
          alt="Community Banner"
        />
      ) : (
        <div className="w-full h-[360px] flex items-center justify-center bg-light-gray text-xl font-medium">
          <p>{item?.name}</p>
        </div>
      )}
      <div className="flex flex-col justify-between w-full h-full gap-4 p-4">
        <div className="flex items-center gap-3">
          {item?.avatar ? (
            <img
              className="object-cover rounded-lg size-10"
              src={getPocketBaseFileUrl({
                recordId: item?.id,
                filename: item?.avatar,
                collectionName: item?.collectionName,
              })}
              alt="Community Avatar"
            />
          ) : (
            <div className="flex items-center justify-center font-medium rounded-lg bg-light-gray size-10">
              <p>{getInitials(item?.name)}</p>
            </div>
          )}
          <h3 className="truncate">{item?.name}</h3>
        </div>
        <p className="max-h-[72px] h-full w-full line-clamp-3">
          {item?.description}
        </p>
        <div className="flex items-center self-end w-full gap-2">
          <p className="capitalize">{item?.type}</p>
          <span>•</span>
          <p>
            {item?.members?.length}{" "}
            {item?.members?.length > 1 ? "Members" : "Member"}
          </p>
          <span>•</span>
          <p className="font-medium capitalize">{item?.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default CommunityCard;
