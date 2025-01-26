import { useMemo } from "react";
import { Link, useSearch } from "@tanstack/react-router";
import { Route } from "@/routes";
import { useListOfAllCommunities } from "@/api/get";
import CommunitiesLoader from "./CommunitiesLoader";
import CommunityCard from "./CommunityCard";
import { useLoggedState } from "@/lib/hooks/useLoggedState";
import useUserStore from "@/store/UserStore";

const CommunitiesList = () => {
  const { isLogged } = useLoggedState();
  const { userId } = useUserStore();
  const { data, isLoading, isError } = useListOfAllCommunities();
  const { category, type, price, search } = useSearch({ from: Route.fullPath });

  const communityRedirection = (members: string[]) => {
    if (members.includes(userId as string)) return "/$id";

    if (isLogged()) return "/$id/about";

    return "/$id/preview";
  };

  const filteredList = useMemo(
    () =>
      data?.filter((item) => {
        return (
          (!category || item.category === category) &&
          (!type || item.type === type) &&
          (!price || item.price === price) &&
          (!search || item.name.toLowerCase().includes(search.toLowerCase()))
        );
      }),
    [data, category, type, price, search]
  );

  if (isLoading) return <CommunitiesLoader />;

  if (isError) {
    return (
      <p className="mt-6 font-medium">
        Oops! We couldn&apos;t fetch the communities. Try again later — the
        internet gremlins are on it! 😢
      </p>
    );
  }

  if (filteredList?.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 mx-auto mt-6 text-center">
        <p className="font-medium text-grayout">
          Nothing here... your chance to shine starts now! ⭐
        </p>
        <Link
          to="/create-community"
          className="px-6 py-2 font-medium rounded-md bg-yellow-primary hover:bg-yellow-primary-hover w-fit"
        >
          Create community
        </Link>
      </div>
    );
  }

  return (
    <div className="grid items-center w-full grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
      {filteredList?.map((item) => (
        <CommunityCard
          item={item}
          key={item?.id}
          communityRedirection={communityRedirection}
        />
      ))}
    </div>
  );
};

export default CommunitiesList;
