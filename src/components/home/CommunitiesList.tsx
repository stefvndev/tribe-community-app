import { useMemo } from "react";
import PocketBase from "pocketbase";
import { useQuery } from "@tanstack/react-query";
import { getPocketBaseFileUrl } from "@/lib/getPocketBaseFileUrl";
import {
  ECommunityCategory,
  ECommunityPrice,
  ECommunityType,
} from "@/lib/enums";
import CommunitiesLoader from "./CommunitiesLoader";

type TCommunities = {
  id: string;
  name: string;
  category: ECommunityCategory;
  price: ECommunityPrice;
  type: ECommunityType;
  description: string;
  members: number;
  banner: string;
  pfp: string;
  collectionName: string;
};

const CommunitiesList = () => {
  const pb = useMemo(
    () => new PocketBase(import.meta.env.VITE_API_BASE_URL),
    []
  );

  const {
    data: allCommunitiesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all_communities"],
    queryFn: async () => {
      const data: TCommunities[] = await pb
        .collection("all_communities")
        .getFullList();
      return data;
    },
  });

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

  return (
    <div className="grid items-center w-full grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
      {allCommunitiesData?.map((item) => (
        <article
          key={item?.id}
          className="flex bg-white flex-col w-full overflow-hidden max-lg:max-w-full border max-w-[335px] h-96 rounded-xl hover:shadow-custom"
        >
          <img
            className="w-full h-[177px] object-cover"
            src={getPocketBaseFileUrl({
              recordId: item?.id,
              filename: item?.banner,
              collectionName: item?.collectionName,
            })}
          />
          <div className="flex flex-col justify-between w-full h-full gap-4 p-4">
            <div className="flex items-center gap-3">
              <img
                className="object-cover rounded-lg size-10"
                src={getPocketBaseFileUrl({
                  recordId: item?.id,
                  filename: item?.pfp,
                  collectionName: item?.collectionName,
                })}
              />
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
        </article>
      ))}
    </div>
  );
};

export default CommunitiesList;
