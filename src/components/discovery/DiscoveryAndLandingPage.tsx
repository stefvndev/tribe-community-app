import { Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { IconSearch } from "@tabler/icons-react";

const DiscoveryAndLandingPage = () => {
  return (
    <div className="w-full h-full min-h-screen px-4 bg-primary">
      <main className="flex flex-col items-center justify-center w-full py-8 mx-auto max-w-landing">
        <div className="flex flex-col items-center w-full text-center">
          <h1 className="text-[45px] font-bold text-dark-primary max-sm:leading-none">
            Discover communities
          </h1>
          <span className="flex max-sm:mt-4 items-center gap-1.5 text-xl font-medium text-dark-primary">
            <p>or</p>
            <Link to="/" className="text-link-blue hover:underline">
              create your own
            </Link>
          </span>
          <div className="w-full max-w-[650px]">
            <Input
              placeholder="Search for anything"
              className="w-full px-5 mt-8 !text-lg pl-14 font-medium bg-white h-14 shadow-custom placeholder:opacity-90 rounded-xl border"
              icon={<IconSearch size={22} className="ml-1.5 opacity-90" />}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DiscoveryAndLandingPage;
