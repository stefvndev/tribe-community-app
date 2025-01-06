import CommunityNavbar from "../navbar/CommunityNavbar";

type TLayout = {
  children: React.ReactNode;
};

const CommunityLayout = ({ children }: TLayout) => {
  return (
    <div className="w-full h-full px-4 pt-16">
      <CommunityNavbar />
      {children}
    </div>
  );
};

export default CommunityLayout;
