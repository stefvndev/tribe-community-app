import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex items-center px-4 pb-6 min-h-[calc(100vh-64px)] justify-center w-full h-full">
      <div className="flex flex-col items-center p-8  max-sm:w-full max-sm:text-center w-[452px] h-full bg-white rounded-xl shadow-custom">
        <Link
          to="/"
          className="mb-6 text-3xl font-bold max-sm:mx-auto text-dark-primary"
        >
          Tribe
        </Link>
        <h2 className="mb-8 text-2xl font-bold text-dark-primary">
          Log in to Tribe
        </h2>
        <form className="flex flex-col items-center w-full h-full gap-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full h-[52px] border text-dark-primary font-base px-4 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full h-[52px] border text-dark-primary font-base px-4 rounded-md"
          />
          <button
            type="submit"
            className="flex items-center justify-center w-full h-12 px-4 mt-2 font-bold uppercase rounded-md bg-yellow-primary text-dark-primary hover:bg-yellow-primary-hover"
          >
            Log in
          </button>
        </form>
        <p className="mt-5">
          Don't have an account?{" "}
          <Link to="/signup" className="text-link-blue hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
