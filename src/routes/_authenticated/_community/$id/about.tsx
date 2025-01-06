import CommunityLayout from "@/components/layout/CommunityLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_community/$id/about")({
  component: () => (
    <CommunityLayout>
      <RouteComponent />
    </CommunityLayout>
  ),
});

function RouteComponent() {
  return <div>Hello "/_community/$id/about"!</div>;
}
