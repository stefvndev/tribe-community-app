import { Link } from "@tanstack/react-router";

const DefaultNotFoundComponent = () => {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-screen p-4">
      <div className="max-w-[454px] p-8 w-full bg-white shadow border h-[277px] rounded-xl flex flex-col items-center">
        <Link className="mb-6 text-3xl font-bold text-dark-primary" to="/">
          tribe
        </Link>
        <h3 className="mb-3 text-2xl font-semibold text-dark-primary">
          404 Error
        </h3>
        <p>Sorry, this page doesn't exist.</p>
        <Link
          className="flex items-center justify-center w-full h-12 px-4 font-bold uppercase rounded-md mt-9 bg-yellow-primary text-dark-primary hover:bg-yellow-primary-hover"
          to="/"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default DefaultNotFoundComponent;
