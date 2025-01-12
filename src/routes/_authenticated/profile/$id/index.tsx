import { useGetUserData, useListOfAllCommunities } from "@/api/get";
import AvatarIcon from "@/components/avatar/AvatarIcon";
import BackButton from "@/components/buttons/BackButton";
import AppLayout from "@/components/layout/AppLayout";
import MembershipsLoader from "@/components/loaders/MembershipsLoader";
import { Skeleton } from "@/components/ui/skeleton";
import { IconCalendar, IconMapPin } from "@tabler/icons-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import dayjs from "dayjs";

export const Route = createFileRoute("/_authenticated/profile/$id/")({
  component: () => (
    <AppLayout>
      <RouteComponent />
    </AppLayout>
  ),
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data, isLoading: isCommunitiesLoading } = useListOfAllCommunities();
  const { data: userData, isLoading: isUserDataLoading } = useGetUserData(id);

  const usersCommunities = data?.filter((item) => item.members.includes(id));

  return (
    <main className="flex flex-col items-center justify-center w-full py-8 mx-auto max-w-1075">
      <div className="flex justify-between w-full h-full gap-6 max-md:flex-col-reverse">
        <div className="w-full h-full">
          <div className="flex items-end justify-between w-full mb-4">
            <p className="font-medium text-dark-primary">Memberships</p>
            <BackButton />
          </div>
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
                        <div className="flex flex-col">
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
                        className="flex items-center self-start justify-center h-8 gap-1 px-3 text-sm font-bold uppercase rounded-md bg-yellow-primary text-dark-primary hover:bg-yellow-primary-hover max-sm:w-full max-sm:mt-2"
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
        </div>
        <div className="w-[400px] items-center p-4 max-md:w-full flex flex-col h-full max-md:h-full bg-white border rounded-xl">
          <div className="p-1 border-4 rounded-full border-light-gray">
            {isUserDataLoading ? (
              <Skeleton className="w-[220px] h-[220px] rounded-full" />
            ) : (
              <AvatarIcon
                avatar={userData?.avatar}
                name={userData?.name || ""}
                id={userData?.id || ""}
                collectionName={userData?.collectionName || ""}
                className="w-[220px] h-[220px] rounded-full text-5xl"
              />
            )}
          </div>
          {isUserDataLoading ? (
            <Skeleton className="h-5 mt-4 w-36" />
          ) : (
            <p className="mt-4 text-lg font-bold text-center">
              {userData?.name}
            </p>
          )}
          {isUserDataLoading ? (
            <Skeleton className="w-32 h-3 mt-2 mb-5" />
          ) : (
            <p className="text-sm font-medium text-grayout">@{userData?.id}</p>
          )}
          {isUserDataLoading ? (
            <>
              {[
                ...Array(3)
                  .fill(null)
                  .map((_, index) => (
                    <Skeleton key={index} className="w-full h-3 my-1" />
                  )),
              ]}
            </>
          ) : (
            <p className="mt-5 text-center text-dark-primary line-clamp-4">
              {userData?.description?.length !== 0
                ? userData?.description
                : "No description yet."}
            </p>
          )}
          <hr className="w-full my-4" />
          {isUserDataLoading ? (
            <>
              {[
                ...Array(2)
                  .fill(null)
                  .map((_, index) => (
                    <Skeleton key={index} className="w-full h-3 my-1" />
                  )),
              ]}
            </>
          ) : (
            <div className="flex flex-col gap-2 mx-auto mt-1">
              <span className="flex items-center gap-4">
                <IconCalendar size={20} className="mb-0.5 text-gray-500" />
                <p>Joined {dayjs(userData?.created).format("MMM DD, YYYY")}</p>
              </span>
              {userData?.location && (
                <span className="flex items-center gap-4">
                  <IconMapPin size={20} className="mb-0.5 text-gray-500" />
                  <p>{userData?.location}</p>
                </span>
              )}
            </div>
          )}
          <hr className="w-full my-4" />
          <div className="flex flex-col items-center w-20">
            {isUserDataLoading ? (
              <Skeleton className="w-10 h-5 mb-1" />
            ) : (
              <p className="text-lg font-medium text-dark-primary">
                {usersCommunities?.length || 0}
              </p>
            )}
            <p className="text-[13px] text-grayout">Communities</p>
          </div>
        </div>
      </div>
    </main>
  );
}
