import { Link } from "@tanstack/react-router";
import MembershipsLoader from "@/components/loaders/MembershipsLoader";
import AvatarIcon from "@/components/avatar/AvatarIcon";
import { useListOfAllCommunities } from "@/api/get";

type TCommunitiesList = {
  id?: string;
};

const ProfileCommunitiesList = ({ id }: TCommunitiesList) => {
  const { data, isLoading: isCommunitiesLoading } = useListOfAllCommunities();

  const usersCommunities = data?.filter((item) =>
    item.members.includes(id as string)
  );

  return (
    <div className="flex flex-col w-full gap-5 p-6 bg-white border rounded-xl">
      {isCommunitiesLoading ? (
        <MembershipsLoader />
      ) : (
        <div className="flex flex-col w-full gap-5">
          {usersCommunities?.length !== 0 ? (
            usersCommunities?.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between w-full border-b max-md:flex-col last:border-b-0"
              >
                <div className="flex items-center w-full gap-2 pb-5">
                  <AvatarIcon
                    avatar={item?.avatar}
                    name={item?.name || ""}
                    id={item?.id || ""}
                    collectionName={item?.collectionName || ""}
                  />
                  <div className="flex flex-col whitespace-nowrap">
                    <p className="text-sm font-bold text-dark-primary">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-1.5 text-sm font-medium text-grayout">
                      <p className="capitalize">{item.type}</p>
                      <span>•</span>
                      <p>
                        {item.members.length}{" "}
                        {item.members.length > 1 ? "Members" : "Member"}
                      </p>
                      <span>•</span>
                      <p className="capitalize">{item.price}</p>
                    </div>
                  </div>
                </div>
                <Link
                  to={`/${item.id}`}
                  className="flex items-center self-start justify-center h-8 gap-1 px-3 text-sm font-bold rounded-md bg-yellow-primary text-dark-primary hover:bg-yellow-primary-hover max-md:w-full max-md:mt-2"
                  type="button"
                >
                  Open
                </Link>
              </div>
            ))
          ) : (
            <div className="space-y-1 text-sm">
              <p>You haven't joined any communities yet.</p>
              <p>
                Click{" "}
                <Link
                  to="/"
                  className="font-medium text-link-blue hover:underline"
                >
                  here
                </Link>{" "}
                to discover the perfect community for you!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileCommunitiesList;
