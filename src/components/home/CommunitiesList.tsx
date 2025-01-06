import { Link } from "@tanstack/react-router";
import { useListOfAllCommunities } from "@/api/get";
import { getInitials } from "@/lib/getInitials";
import { getPocketBaseFileUrl } from "@/lib/getPocketBaseFileUrl";
import CommunitiesLoader from "./CommunitiesLoader";
import { useLoggedState } from "@/lib/useLoggedState";

const CommunitiesList = () => {
  const { data, isLoading, isError } = useListOfAllCommunities();
  const { isLogged } = useLoggedState();

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

  if (data?.length === 0) {
    return (
      <p className="mt-4 font-medium">
        Nothing here... your chance to shine starts now! ⭐
      </p>
    );
  }

  return (
    <div className="grid items-center w-full grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
      {data?.map((item) => (
        <Link
          to={isLogged() ? "/$id/about" : "/$id/preview"}
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
              <p>{item?.type}</p>
              <span>•</span>
              <p>{item?.members} Members</p>
              <span>•</span>
              <p className="font-medium">{item?.price}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CommunitiesList;
