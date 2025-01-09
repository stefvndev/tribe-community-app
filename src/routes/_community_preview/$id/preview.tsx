import { useCallback, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useCommunityData } from "@/api/get";
import Cookies from "js-cookie";
import AboutAndPreviewPage from "@/components/about/AboutAndPreviewPage";
import CommunityLayout from "@/components/layout/CommunityLayout";
import DefaultNotFoundComponent from "@/components/notFound/DefaultNotFoundComponent";

export const Route = createFileRoute("/_community_preview/$id/preview")({
  component: () => (
    <CommunityLayout>
      <RouteComponent />
    </CommunityLayout>
  ),
});

function RouteComponent() {
  const { id } = Route.useParams();
  const userId = Cookies.get("userId");
  const { data, isError, isLoading } = useCommunityData(id);
  const navigate = Route.useNavigate();

  const isCommunityMember = useCallback(
    () => data?.members.includes(userId as string),
    [data, userId]
  );

  useEffect(() => {
    if (isCommunityMember()) {
      navigate({ to: `/${id}/about` });
    }
  }, [isCommunityMember, navigate, id]);

  if (isError) return <DefaultNotFoundComponent />;

  return <AboutAndPreviewPage data={data} isLoading={isLoading} />;
}
