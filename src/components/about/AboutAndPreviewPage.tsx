import { useEffect, useRef, useState } from "react";
import { ECommunityType } from "@/enums/enums";
import { getInitials } from "@/lib/getInitials";
import { getPocketBaseFileUrl } from "@/lib/getPocketBaseFileUrl";
import { cn } from "@/lib/utils";
import { TCommunities } from "@/types/types";
import {
  IconLink,
  IconLoader2,
  IconLock,
  IconLockOpen2,
  IconTag,
  IconUsers,
} from "@tabler/icons-react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Skeleton } from "../ui/skeleton";
import Cookies from "js-cookie";
import { useCommunityData } from "@/api/get";
import { toast } from "sonner";
import { useMutateJoinCommunity } from "@/api/patch";
import { Route } from "@/routes/_community_preview/$id/preview";
import { useLoggedState } from "@/lib/useLoggedState";

type TAboutAndPreviewPageProps = {
  data?: TCommunities;
  isLoading: boolean;
};

const AboutAndPreviewPage = ({
  data,
  isLoading,
}: TAboutAndPreviewPageProps) => {
  const { data: communityData } = useCommunityData(data?.id as string);
  const { mutateAsync: mutateAsyncJoinCommunity, isPending: isJoiningPending } =
    useMutateJoinCommunity();
  const location = useLocation();
  const isAbout = location.pathname.includes("about");
  const userId = Cookies.get("userId");
  const navigate = useNavigate({ from: Route.fullPath });
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [showFullText, setShowFullText] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const { isLogged } = useLoggedState();

  const handleJoinToCommunity = async (communityId: string) => {
    if (!isLogged()) {
      navigate({ to: "/signup" });
      toast.error("You need to be logged in to join the Community!", {
        description: "Please sign in or create an account.",
      });
      return;
    }
    try {
      const updatedMembers = [
        ...(communityData?.members || []),
        userId,
      ] as string[];

      await mutateAsyncJoinCommunity({ communityId, updatedMembers });

      toast.success(`Welcome to the "${data?.name}" community!`, {
        description: "You have successfully joined the community.",
      });

      navigate({ to: "/$id" });
    } catch {
      toast.error("Failed to join the Community!", {
        description: "Please try again later.",
      });
    }
  };

  useEffect(() => {
    if (descriptionRef.current) {
      const { scrollHeight, clientHeight } = descriptionRef.current;
      setIsOverflowing(scrollHeight > clientHeight);
    }
  }, [data?.description]);

  return (
    <main className="flex w-full gap-6 py-6 mx-auto max-w-1075 max-md:flex-col">
      <div className="w-full p-6 bg-white border rounded-xl">
        {isLoading ? (
          <Skeleton className="w-1/3 h-8 mb-6" />
        ) : (
          <h1 className="mb-6 text-2xl font-bold">{data?.name}</h1>
        )}
        {isLoading ? (
          <Skeleton className="w-full rounded-xl h-96 max-md:h-48" />
        ) : (
          <>
            {data?.avatar ? (
              <img
                src={getPocketBaseFileUrl({
                  recordId: data?.id,
                  filename: data?.avatar,
                  collectionName: data?.collectionName,
                })}
                className="object-cover w-full rounded-xl h-96 max-md:h-48"
              />
            ) : (
              <div className="flex items-center justify-center w-full bg-light-gray rounded-xl h-96 max-md:h-48">
                <p className="text-2xl font-medium">{data?.name}</p>
              </div>
            )}
          </>
        )}
        <div className="flex flex-wrap items-center w-full gap-10 mt-10 mb-6 max-md:gap-4">
          <span className="flex items-center gap-2 text-base font-medium capitalize max-md:text-sm whitespace-nowrap text-dark-primary">
            {data?.type === ECommunityType.PRIVATE ? (
              <IconLock size={26} />
            ) : (
              <IconLockOpen2 size={26} />
            )}
            {isLoading ? (
              <Skeleton className="h-4 w-28" />
            ) : (
              <span>{data?.type} group</span>
            )}
          </span>
          <span className="flex items-center gap-2 text-base font-medium capitalize max-md:text-sm whitespace-nowrap text-dark-primary">
            <IconUsers size={26} />
            {isLoading ? (
              <Skeleton className="h-4 w-28" />
            ) : (
              <span>
                {data?.members?.length}{" "}
                {(data?.members?.length as number) > 1 ? "members" : "member"}
              </span>
            )}
          </span>
          <span className="flex items-center gap-2 text-base font-medium capitalize max-md:text-sm whitespace-nowrap text-dark-primary">
            <IconTag size={26} />
            {isLoading ? (
              <Skeleton className="h-4 w-28" />
            ) : (
              <span>{data?.price}</span>
            )}
          </span>
          <div className="flex items-center gap-2 text-base font-medium capitalize max-md:text-sm whitespace-nowrap text-dark-primary">
            {data?.avatar ? (
              <img
                src={getPocketBaseFileUrl({
                  recordId: data?.expand?.createdBy?.id,
                  filename: data?.expand?.createdBy?.avatar,
                  collectionName: data?.expand?.createdBy?.collectionName,
                })}
                alt="Community Banner"
                className="object-cover rounded-full size-9 min-h-9 min-w-9"
              />
            ) : (
              <div className="flex items-center justify-center font-medium rounded-full min-h-9 min-w-9 bg-light-gray size-9">
                <p>{getInitials(data?.expand?.createdBy?.name as string)}</p>
              </div>
            )}
            {isLoading ? (
              <Skeleton className="h-4 w-28" />
            ) : (
              <p>By {data?.expand?.createdBy?.name} 👑</p>
            )}
          </div>
        </div>
        <div>
          {isLoading ? (
            [...Array(6)].map((_, index) => (
              <Skeleton key={index} className="w-full h-5 mb-2" />
            ))
          ) : (
            <p
              ref={descriptionRef}
              className={cn(!showFullText && "line-clamp-[10]")}
            >
              {data?.description}
            </p>
          )}
          {!isLoading && isOverflowing && (
            <button
              className="font-medium text-blue-500 underline"
              onClick={() => setShowFullText(!showFullText)}
              type="button"
            >
              {showFullText ? "Show less" : "Show more"}
            </button>
          )}
        </div>
      </div>

      {!isAbout && (
        <div className="max-w-[272px] max-md:max-w-full h-[510px] max-md:h-full w-full bg-white border rounded-xl overflow-hidden">
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
                  alt="Community Banner"
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
              to="/signup"
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
            <button
              onClick={() => handleJoinToCommunity(data?.id as string)}
              disabled={isJoiningPending}
              type="submit"
              className={cn(
                "flex items-center justify-center w-full h-12 px-4 mt-4 font-bold uppercase rounded-md bg-yellow-primary text-dark-primary hover:bg-yellow-primary-hover",
                isJoiningPending &&
                  "bg-light-gray text-gray-500 hover:bg-light-gray"
              )}
            >
              {isJoiningPending ? (
                <IconLoader2 className="animate-spin" size={22} />
              ) : (
                "Join Group"
              )}
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default AboutAndPreviewPage;
