import DiscoveryAndLandingPage from "@/components/discovery/DiscoveryAndLandingPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <DiscoveryAndLandingPage />;
}
