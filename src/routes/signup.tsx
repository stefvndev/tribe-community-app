import textListSignUp from "@/components/signup/textListLogin";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex items-center px-4 pb-6 min-h-[calc(100vh-64px)] justify-center w-full h-full">
      <div className="flex justify-between w-full h-full gap-5 max-lg:flex-col-reverse max-lg:gap-16 max-lg:mt-14 max-lg:items-center max-w-1075">
        <div className="flex flex-col items-start max-sm:text-center w-full max-w-[440px] max-sm:max-w-full">
          <Link
            to="/"
            className="text-4xl font-bold max-sm:mx-auto text-dark-primary"
          >
            Tribe
          </Link>
          <h1 className="text-2xl font-bold my-7 text-dark-text">
            Everything you need to build community and make money online.
          </h1>
          <ul className="flex flex-col gap-6 mt-2 text-lg font-medium max-sm:mx-auto">
            {textListSignUp?.map((item) => (
              <li
                className="flex gap-4 sm:items-center max-sm:mx-auto"
                key={item.id}
              >
                <p>{item.icon}</p>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center p-8  max-sm:w-full max-sm:text-center w-[452px] h-full bg-white rounded-xl shadow-custom">
          <h2 className="mb-8 text-2xl font-bold text-dark-primary">
            Create your Tribe account
          </h2>
          <form className="flex flex-col items-center w-full h-full gap-4">
            <input
              type="text"
              placeholder="First name"
              className="w-full h-[52px] border text-dark-primary font-base px-4 rounded-md"
            />
            <input
              type="text"
              placeholder="Last name"
              className="w-full h-[52px] border text-dark-primary font-base px-4 rounded-md"
            />
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
              Sign up
            </button>
          </form>
          <p className="mt-5">
            Already have an account?{" "}
            <Link to="/login" className="text-link-blue hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
