import AppLayout from "@/components/layout/AppLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/profile")({
  component: () => (
    <AppLayout>
      <RouteComponent />
    </AppLayout>
  ),
});

function RouteComponent() {
  return <div className="w-full h-full p-4">Profile page</div>;
}
