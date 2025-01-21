import { createFileRoute, redirect } from "@tanstack/react-router";

type TQueries = {
  chat?: string;
};

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const { isLogged } = context.authentication;
    if (!isLogged()) {
      throw redirect({ to: "/login" });
    }
  },

  validateSearch: (search: Record<string, unknown>): TQueries => {
    return {
      chat: search.chat as string,
    };
  },
});
