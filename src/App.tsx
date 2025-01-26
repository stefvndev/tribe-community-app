import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./index.css";

// Import the generated route tree
import DefaultNotFoundComponent from "@/components/notFound/DefaultNotFoundComponent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import { useLoggedState } from "./lib/hooks/useLoggedState";

// Create a new router instance
const queryClient = new QueryClient();
const router = createRouter({
  routeTree,
  context: { queryClient, authentication: undefined! },
  defaultNotFoundComponent: () => <DefaultNotFoundComponent />,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  const authentication = useLoggedState();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ authentication }} />
    </QueryClientProvider>
  );
};

export default App;
