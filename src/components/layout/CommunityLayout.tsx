import { useCommunityData } from "@/api/get";
import CommunityNavbar from "../navbar/CommunityNavbar";
import { useParams } from "@tanstack/react-router";
import DefaultNotFoundComponent from "../notFound/DefaultNotFoundComponent";
import { cn } from "@/lib/utils";
import { useLoggedState } from "@/lib/useLoggedState";

type TLayout = {
  children: React.ReactNode;
};

const CommunityLayout = ({ children }: TLayout) => {
  const { id } = useParams({ strict: false });
  const { isError } = useCommunityData(id as string);
  const { isLogged } = useLoggedState();

  if (id && isError) return <DefaultNotFoundComponent />;

  return (
    <div
      className={cn(
        "w-full h-full px-4 pt-16",
        isLogged() && id ? "pt-28" : "pt-16"
      )}
    >
      <CommunityNavbar />
      {children}
    </div>
  );
};

export default CommunityLayout;
