import { useCommunityData } from "@/api/get";
import CommunityLayout from "@/components/layout/CommunityLayout";
import DefaultNotFoundComponent from "@/components/notFound/DefaultNotFoundComponent";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_community_preview/$id/preview")({
  component: () => (
    <CommunityLayout>
      <RouteComponent />
    </CommunityLayout>
  ),
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data, isError } = useCommunityData(id);

  if (isError) return <DefaultNotFoundComponent />;

  return (
    <main className="flex items-center justify-center p-4 mx-auto max-w-1075">
      {data?.name}
    </main>
  );
}
