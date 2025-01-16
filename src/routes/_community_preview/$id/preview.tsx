import { createFileRoute } from "@tanstack/react-router";
import { useCommunityData } from "@/api/get";
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
  const { data, isError, isLoading } = useCommunityData(id);

  if (isError) return <DefaultNotFoundComponent />;

  return <AboutAndPreviewPage data={data} isLoading={isLoading} />;
}
