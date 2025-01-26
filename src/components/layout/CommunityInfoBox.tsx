import { useMutateJoinCommunity } from "@/api/patch";
import { Skeleton } from "@/components/ui/skeleton";
import { getPocketBaseFileUrl } from "@/lib/getPocketBaseFileUrl";
import { useLoggedState } from "@/lib/hooks/useLoggedState";
import { Route } from "@/routes/_community_preview/$id/preview";
import useUserStore from "@/store/UserStore";
import { TCommunities } from "@/types/types";
import { IconLink, IconLoader2 } from "@tabler/icons-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import DeleteCommunityModal from "../modals/DeleteCommunityModal";
import LeaveCommunityModal from "../modals/LeaveCommunityModal";
import MainButton from "../buttons/MainButton";

type TInfoBoxProps = {
  data?: TCommunities;
  isLoading: boolean;
};

const CommunityInfoBox = ({ data, isLoading }: TInfoBoxProps) => {
  const { isLogged } = useLoggedState();
  const { userId } = useUserStore();
  const navigate = useNavigate({ from: Route.fullPath });
  const isMember = data?.members?.includes(userId as string);
  const isOwner = data?.createdBy === userId;
  const { mutateAsync: mutateAsyncJoinCommunity, isPending: isJoiningPending } =
    useMutateJoinCommunity();

  const handleJoinToCommunity = async (communityId: string) => {
    if (!isLogged()) {
      navigate({ to: "/signup" });
      toast.error("You need to be logged in to join the Community!", {
        description: "Please sign in or create an account.",
      });
      return;
    }
    try {
      const updatedMembers = [...(data?.members || []), userId] as string[];

      await mutateAsyncJoinCommunity({ communityId, updatedMembers });

      toast.success(`Welcome to the "${data?.name}" community!`, {
        description: "You have successfully joined the community.",
      });
    } catch {
      toast.error("Failed to join the Community!", {
        description: "Please try again later.",
      });
    }
  };

  return (
    <div className="w-[385px] max-md:w-full h-full max-md:h-full bg-white border rounded-xl overflow-hidden">
      {isLoading ? (
        <Skeleton className="w-full rounded-none h-36 max-md:h-48" />
      ) : (
        <>
          {data?.avatar ? (
            <img
              src={getPocketBaseFileUrl({
                recordId: data?.id,
                filename: data?.avatar,
                collectionName: data?.collectionName,
              })}
              alt="Community avatar"
              className="object-cover w-full h-36 max-md:h-48"
            />
          ) : (
            <div className="flex items-center justify-center w-full bg-light-gray h-36 max-md:h-48">
              <p className="text-xl font-medium">{data?.name}</p>
            </div>
          )}
        </>
      )}
      <div className="flex flex-col p-4">
        {isLoading ? (
          <Skeleton className="w-32 h-4 mb-2" />
        ) : (
          <h2 className="text-lg font-medium truncate text-dark-primary max-w-56">
            {data?.name}
          </h2>
        )}

        {isLoading ? (
          <Skeleton className="w-28 h-2.5" />
        ) : (
          <p className="text-[13px] flex items-center text-grayout font-bold whitespace-nowrap truncate max-w-56">
            tribe/{data?.id}
          </p>
        )}

        {isLoading ? (
          <div className="my-3">
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} className="w-full h-3 mb-2" />
            ))}
          </div>
        ) : (
          <p className="my-3 text-base break-words text-dark-primary line-clamp-4">
            {data?.description}
          </p>
        )}
        <Link
          to={isLogged() ? "/create-community" : "/signup"}
          className="flex items-center gap-1.5 text-sm text-grayout truncate hover:text-dark-primary hover:underline transition-all ease-in-out"
        >
          <IconLink size={16} /> Lead Your Own Community
        </Link>
        <hr className="w-full mt-4 mb-2" />
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col items-center w-20">
            {isLoading ? (
              <Skeleton className="w-10 h-5 mb-1" />
            ) : (
              <p className="text-lg font-medium text-dark-primary">
                {data?.members?.length}
              </p>
            )}
            <p className="text-[13px] text-grayout">
              {(data?.members?.length as number) > 1 ? "Members" : "Member"}
            </p>
          </div>
          <div className="flex flex-col items-center w-20 border-gray-200 border-x">
            {isLoading ? (
              <Skeleton className="w-10 h-5 mb-1" />
            ) : (
              <p className="text-lg font-medium text-dark-primary">N/A</p>
            )}
            <p className="text-[13px] text-grayout">Online</p>
          </div>
          <div className="flex flex-col items-center w-20">
            {isLoading ? (
              <Skeleton className="w-10 h-5 mb-1" />
            ) : (
              <p className="text-lg font-medium text-dark-primary">1</p>
            )}
            <p className="text-[13px] text-grayout">Admins</p>
          </div>
        </div>
        <hr className="w-full mt-2" />
        {isLoading ? (
          <Skeleton className="w-full h-12 mt-4" />
        ) : (
          <>
            {!isMember && (
              <MainButton
                onClick={() => handleJoinToCommunity(data?.id as string)}
                disabled={isJoiningPending}
                type="submit"
                className="w-full h-12 mt-4"
              >
                {isJoiningPending ? (
                  <IconLoader2 className="animate-spin" size={22} />
                ) : (
                  "Join Group"
                )}
              </MainButton>
            )}

            {isOwner && <DeleteCommunityModal data={data} isOwner={isOwner} />}

            {isMember && !isOwner && (
              <LeaveCommunityModal data={data} userId={userId} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CommunityInfoBox;
