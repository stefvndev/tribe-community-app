import { createFileRoute, Link } from "@tanstack/react-router";
import dayjs from "dayjs";
import useUserStore from "@/store/UserStore";
import { useGetUserData } from "@/api/get";
import { pb } from "@/api/pocketbase";
import AvatarIcon from "@/components/avatar/AvatarIcon";
import BackButton from "@/components/buttons/BackButton";
import AppLayout from "@/components/layout/AppLayout";
import ProfileCommunitiesList from "@/components/profile-community-list/ProfileCommunitiesList";
import { Skeleton } from "@/components/ui/skeleton";
import {
  IconCalendar,
  IconMapPin,
  IconMessage,
  IconSettings,
} from "@tabler/icons-react";
import MainButton from "@/components/buttons/MainButton";

export const Route = createFileRoute("/_authenticated/profile/$id/")({
  component: () => (
    <AppLayout>
      <RouteComponent />
    </AppLayout>
  ),
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: userData, isLoading: isUserDataLoading } = useGetUserData(id);
  const { userId } = useUserStore();
  const navigate = Route.useNavigate();

  const handleChatClick = async (memberId: string) => {
    try {
      const existingConversations = await pb
        .collection("conversations")
        .getFullList({
          filter: `users ~ "${userId}" && users ~ "${memberId}"`,
        });

      let conversationId;

      if (existingConversations.length > 0) {
        conversationId = existingConversations[0].id;
      } else {
        const newConversation = await pb.collection("conversations").create({
          users: [userId, memberId],
        });
        conversationId = newConversation.id;
      }

      navigate({ to: `/chat/${conversationId}` });
    } catch (err) {
      console.error("Error initiating chat:", err);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center w-full py-8 mx-auto max-w-1075">
      <div className="flex justify-between w-full h-full gap-6 max-md:flex-col-reverse">
        <div className="w-full h-full">
          <div className="flex items-end justify-between w-full mb-4">
            <p className="font-medium text-dark-primary">Memberships</p>
            <BackButton />
          </div>
          <ProfileCommunitiesList id={id} />
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
          {userData?.id === userId && (
            <Link
              to="/settings"
              className="flex items-center self-end justify-center w-full h-12 gap-1 px-6 font-bold rounded-md bg-yellow-primary text-dark-primary hover:bg-yellow-primary-hover"
            >
              <IconSettings size={22} />
              Settings
            </Link>
          )}
          {userData?.id !== userId && (
            <MainButton
              onClick={() => handleChatClick(userData?.id as string)}
              type="button"
              className="w-full px-6 "
            >
              <IconMessage size={22} />
              Chat
            </MainButton>
          )}
        </div>
      </div>
    </main>
  );
}
