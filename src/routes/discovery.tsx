import DiscoveryAndLandingPage from "@/components/discovery/DiscoveryAndLandingPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/discovery")({
  component: RouteComponent,
});

function RouteComponent() {
  return <DiscoveryAndLandingPage />;
}
