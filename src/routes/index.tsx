import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full h-full min-h-screen bg-primary">
      <main className="flex flex-col w-full px-4">Home</main>
    </div>
  );
}
