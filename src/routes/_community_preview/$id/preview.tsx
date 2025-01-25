import { createFileRoute } from "@tanstack/react-router";
import AboutAndPreviewPage from "@/components/about/AboutAndPreviewPage";
import CommunityLayout from "@/components/layout/CommunityLayout";
import DefaultNotFoundComponent from "@/components/notFound/DefaultNotFoundComponent";
import useCommunityStore from "@/store/CommunityStore";

export const Route = createFileRoute("/_community_preview/$id/preview")({
  component: () => (
    <CommunityLayout>
      <RouteComponent />
    </CommunityLayout>
  ),
});

function RouteComponent() {
  const { data, isLoading, isError } = useCommunityStore();

  if (isError) return <DefaultNotFoundComponent />;

  return <AboutAndPreviewPage data={data} isLoading={isLoading} />;
}
