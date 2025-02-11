import { createFileRoute, Link } from "@tanstack/react-router";
import dayjs from "dayjs";
import { toast } from "sonner";
import { useMutateRemoveUserFromCommunity } from "@/api/patch";
import { pb } from "@/api/pocketbase";
import CommunityLayout from "@/components/layout/CommunityLayout";
import MembersLoader from "@/components/loaders/MembersLoader";
import { getInitials } from "@/lib/getInitials";
import { getPocketBaseFileUrl } from "@/lib/getPocketBaseFileUrl";
import useCommunityStore from "@/store/CommunityStore";
import useUserStore from "@/store/UserStore";
import {
  IconCalendar,
  IconLoader2,
  IconMapPin,
  IconMessage,
} from "@tabler/icons-react";
import MainButton from "@/components/buttons/MainButton";

export const Route = createFileRoute("/_authenticated/_community/$id/members")({
  component: () => (
    <CommunityLayout>
      <RouteComponent />
    </CommunityLayout>
  ),
});

function RouteComponent() {
  const { data, isLoading } = useCommunityStore();
  const navigate = Route.useNavigate();
  const { userId } = useUserStore();
  const communityMembers = data?.expand?.members;
  const isOwner = (id: string) => data?.createdBy === id;
  const isMember = communityMembers?.some(
    (member) => member.id === (userId as string)
  );
  const isUserOwner = userId === data?.createdBy;
  const {
    mutateAsync: mutateAsyncRemoveUser,
    isPending: isRemovingUserPending,
  } = useMutateRemoveUserFromCommunity();

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

  const handleRemoveUserFromCommunity = async (removedMemberId: string) => {
    try {
      const updatedMembers = data?.members?.filter(
        (member) => member !== removedMemberId
      ) as string[];

      await mutateAsyncRemoveUser({
        communityId: data?.id as string,
        updatedMembers,
      });
      toast.success("Member is successfuly removed from the community.");
    } catch {
      toast.error("Error", {
        description: "Error. Please try again.",
      });
    }
  };

  return (
    <main className="w-full h-full">
      <div className="w-full p-6 bg-white border rounded-xl">
        <h1 className="mb-2 text-2xl font-bold">Members</h1>
        <div className="flex flex-col w-full gap-2">
          {isLoading ? (
            <MembersLoader />
          ) : (
            isMember &&
            communityMembers?.map((member) => (
              <div
                key={member.id}
                className="flex justify-between w-full py-4 border-b max-lg:flex-col last:border-b-0 border-b-grayout/60"
              >
                <div className="flex gap-4">
                  <div className="relative">
                    {isOwner(member.id) && (
                      <span className="absolute z-10 text-2xl -right-3 -top-5 rotate-[35deg] select-none">
                        👑
                      </span>
                    )}
                    {member.avatar ? (
                      <img
                        src={getPocketBaseFileUrl({
                          recordId: member?.id,
                          filename: member?.avatar,
                          collectionName: member?.collectionName,
                        })}
                        alt="Community avatar"
                        className="object-cover rounded-full size-12 min-h-12 min-w-12"
                      />
                    ) : (
                      <div className="flex items-center justify-center font-medium rounded-full min-h-12 min-w-12 bg-light-gray size-12">
                        <p>{getInitials(member.name)}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <p className="font-medium text-dark-primary">
                      {member.name}
                    </p>
                    <Link
                      to={`/profile/${member.id}`}
                      className="text-xs font-medium w-fit text-grayout hover:underline hover:text-dark-primary"
                    >
                      @{member.id}
                    </Link>
                    <p className="w-full pr-10 my-3 line-clamp-2">
                      {member.description !== ""
                        ? member.description
                        : "No description yet."}
                    </p>
                    <div className="flex flex-col w-full gap-2 mt-1">
                      <span className="flex items-center gap-4">
                        <IconCalendar
                          size={20}
                          className="mb-0.5 text-gray-500"
                        />
                        <p>
                          Joined {dayjs(member.created).format("MMM DD, YYYY")}
                        </p>
                      </span>
                      {member.location && (
                        <span className="flex items-center gap-4">
                          <IconMapPin
                            size={20}
                            className="mb-0.5 text-gray-500"
                          />
                          <p>{member.location}</p>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 max-lg:mt-10 max-lg:flex-col">
                  {userId !== member?.id && (
                    <MainButton
                      onClick={() => handleChatClick(member?.id)}
                      type="button"
                      className="self-start w-full h-10 capitalize max-lg:w-full"
                    >
                      <IconMessage size={20} />
                      Chat
                    </MainButton>
                  )}

                  {isUserOwner && userId !== member?.id && (
                    <button
                      disabled={isRemovingUserPending}
                      onClick={() => handleRemoveUserFromCommunity(member?.id)}
                      type="button"
                      className="flex items-center self-start justify-center h-10 gap-1 px-4 font-bold text-white bg-red-600 rounded-md hover:bg-red-700 max-lg:w-full disabled:bg-light-gray disabled:text-dark-primary"
                    >
                      {isRemovingUserPending ? (
                        <IconLoader2 size={20} className="animate-spin" />
                      ) : (
                        "Remove"
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))
          )}

          {!isMember && !isLoading && (
            <p>
              Join the community to access and view other community members.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
