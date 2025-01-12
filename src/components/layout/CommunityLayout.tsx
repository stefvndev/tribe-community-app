import { useEffect } from "react";
import { useParams } from "@tanstack/react-router";
import { useCommunityData } from "@/api/get";
import CommunityNavbar from "../navbar/CommunityNavbar";
import DefaultNotFoundComponent from "../notFound/DefaultNotFoundComponent";
import { cn } from "@/lib/utils";
import { useLoggedState } from "@/lib/useLoggedState";
import CommunityInfoBox from "./CommunityInfoBox";

type TLayout = {
  children: React.ReactNode;
};

const CommunityLayout = ({ children }: TLayout) => {
  const { id } = useParams({ strict: false });
  const { data, isLoading, isError } = useCommunityData(id as string);
  const { isLogged } = useLoggedState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (id && isError) return <DefaultNotFoundComponent />;

  return (
    <div
      className={cn(
        "w-full h-full px-4 pt-16",
        isLogged() && id ? "pt-28" : "pt-16"
      )}
    >
      <CommunityNavbar />
      <div className="flex w-full gap-6 py-6 mx-auto max-w-1075 max-md:flex-col">
        <div className="w-full">{children}</div>
        <CommunityInfoBox data={data} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default CommunityLayout;
