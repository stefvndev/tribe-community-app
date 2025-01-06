import { useCommunityData } from "@/api/get";
import CommunityLayout from "@/components/layout/CommunityLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_community/$id/")({
  component: () => (
    <CommunityLayout>
      <RouteComponent />
    </CommunityLayout>
  ),
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data } = useCommunityData(id);

  return (
    <main className="w-full h-full">
      <div className="flex items-center justify-center p-4 mx-auto max-w-1075">
        {data?.name}
      </div>
    </main>
  );
}
