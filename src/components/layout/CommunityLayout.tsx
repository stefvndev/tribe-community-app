import { useEffect } from "react";
import { useLocation, useParams } from "@tanstack/react-router";
import { useCommunityData } from "@/api/get";
import CommunityNavbar from "../navbar/CommunityNavbar";
import DefaultNotFoundComponent from "../notFound/DefaultNotFoundComponent";
import { cn } from "@/lib/utils";
import { useLoggedState } from "@/lib/useLoggedState";
import CommunityInfoBox from "./CommunityInfoBox";
import { pb } from "@/api/pocketbase";

type TLayout = {
  children: React.ReactNode;
};

const CommunityLayout = ({ children }: TLayout) => {
  const userId = pb.authStore.record?.id;
  const { id } = useParams({ strict: false });
  const { data, isLoading, isError } = useCommunityData(id as string);
  const { isLogged } = useLoggedState();
  const location = useLocation();
  const hideInfoBox = !(
    location?.href?.includes("calendar") ||
    location?.href?.includes("classroom")
  );
  const isUserMember = data?.members.includes(userId as string);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (id && isError) return <DefaultNotFoundComponent />;

  return (
    <div
      className={cn(
        "w-full h-full px-4 pt-16",
        isLogged() && id && isUserMember ? "pt-28" : "pt-16"
      )}
    >
      <CommunityNavbar />
      <div className="flex w-full h-full gap-10 py-6 mx-auto max-w-1075 max-md:flex-col">
        <div className="w-full h-full">{children}</div>
        {hideInfoBox && <CommunityInfoBox data={data} isLoading={isLoading} />}
      </div>
    </div>
  );
};

export default CommunityLayout;
