import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useCommunityData } from "@/api/get";
import CommunityLayout from "@/components/layout/CommunityLayout";
import { getInitials } from "@/lib/getInitials";
import { getPocketBaseFileUrl } from "@/lib/getPocketBaseFileUrl";
import { IconCalendar, IconMapPin, IconMessage } from "@tabler/icons-react";
import dayjs from "dayjs";
import MembersLoader from "@/components/loaders/MembersLoader";

export const Route = createFileRoute("/_authenticated/_community/$id/members")({
  component: () => (
    <CommunityLayout>
      <RouteComponent />
    </CommunityLayout>
  ),
});

function RouteComponent() {
  const { id } = useParams({ strict: false });
  const { data, isLoading } = useCommunityData(id as string);
  const communityMembers = data?.expand?.members;
  const isOwner = (id: string) => data?.createdBy === id;

  return (
    <main className="w-full h-full">
      <div className="w-full p-6 bg-white border rounded-xl">
        <h1 className="mb-2 text-2xl font-bold">Members</h1>
        <div className="flex flex-col w-full gap-2">
          {isLoading ? (
            <MembersLoader />
          ) : (
            communityMembers?.map((member) => (
              <div
                key={member.id}
                className="flex justify-between w-full py-4 border-b max-sm:flex-col last:border-b-0 border-b-grayout/60"
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
                        alt="Community Banner"
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
                <Link
                  className="flex items-center self-start justify-center h-10 gap-1 px-4 font-bold rounded-md bg-yellow-primary text-dark-primary hover:bg-yellow-primary-hover max-sm:w-full max-sm:mt-2"
                  type="button"
                >
                  <IconMessage size={20} />
                  Chat
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
