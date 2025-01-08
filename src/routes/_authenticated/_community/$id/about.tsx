import { useCommunityData } from "@/api/get";
import AboutAndPreviewPage from "@/components/about/AboutAndPreviewPage";
import CommunityLayout from "@/components/layout/CommunityLayout";
import DefaultNotFoundComponent from "@/components/notFound/DefaultNotFoundComponent";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_community/$id/about")({
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
