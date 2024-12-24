import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Navbar from "../components/navbar/Navbar";

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <div className="pt-16">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  ),
});
