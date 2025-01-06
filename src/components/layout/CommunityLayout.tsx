import { useCommunityData } from "@/api/get";
import CommunityNavbar from "../navbar/CommunityNavbar";
import { useParams } from "@tanstack/react-router";
import DefaultNotFoundComponent from "../notFound/DefaultNotFoundComponent";

type TLayout = {
  children: React.ReactNode;
};

const CommunityLayout = ({ children }: TLayout) => {
  const { id } = useParams({ strict: false });
  const { isError } = useCommunityData(id as string);

  if (isError) return <DefaultNotFoundComponent />;

  return (
    <div className="w-full h-full px-4 pt-16">
      <CommunityNavbar />
      {children}
    </div>
  );
};

export default CommunityLayout;
