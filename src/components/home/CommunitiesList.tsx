import { Route } from "@/routes";
import { Link, useSearch } from "@tanstack/react-router";
import { useListOfAllCommunities } from "@/api/get";
import { getInitials } from "@/lib/getInitials";
import { getPocketBaseFileUrl } from "@/lib/getPocketBaseFileUrl";
import CommunitiesLoader from "./CommunitiesLoader";
import { useLoggedState } from "@/lib/useLoggedState";
import { pb } from "@/api/pocketbase";

const CommunitiesList = () => {
  const { data, isLoading, isError } = useListOfAllCommunities();
  const { isLogged } = useLoggedState();
  const { category, type, price, search } = useSearch({ from: Route.fullPath });
  const userId = pb.authStore.record?.id;

  const filteredList = data?.filter((item) => {
    return (
      (!category || item?.category === category) &&
      (!type || item?.type === type) &&
      (!price || item?.price === price) &&
      (!search || item?.name.toLowerCase().includes(search.toLowerCase()))
    );
  });

  const communityRedirection = (members: string[]) => {
    if (members.includes(userId as string)) return "/$id";

    if (isLogged()) return "/$id/about";

    return "/$id/preview";
  };

  if (isLoading) {
    return <CommunitiesLoader />;
  }

  if (isError) {
    return (
      <p className="mt-4 font-medium">
        Oops! We couldn&apos;t fetch the communities. Try again later — the
        internet gremlins are on it! 😢
      </p>
    );
  }

  if (filteredList?.length === 0) {
    return (
      <p className="mt-4 font-medium text-grayout">
        Nothing here... your chance to shine starts now! ⭐
      </p>
    );
  }

  return (
    <div className="grid items-center w-full grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
      {filteredList?.map((item) => (
        <Link
          to={communityRedirection(item?.members)}
          params={{
            id: item?.id,
          }}
          key={item?.id}
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
      ))}
    </div>
  );
};

export default CommunitiesList;
