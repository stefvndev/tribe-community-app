import React from "react";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { AuthContext } from "@/lib/hooks/useLoggedState";
import { QueryClient } from "@tanstack/react-query";

type RouterContext = {
  authentication: AuthContext;
  queryClient: QueryClient;
};

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : React.lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        }))
      );

const ReactQueryDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : React.lazy(() =>
        import("@tanstack/react-query-devtools").then((res) => ({
          default: res.ReactQueryDevtools,
        }))
      );

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <div className="w-full min-h-screen bg-primary">
        <Outlet />
        <Toaster />
      </div>
      {/* devtools */}
      <TanStackRouterDevtools />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  ),
});
