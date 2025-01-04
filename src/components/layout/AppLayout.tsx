import Navbar from "@/components/navbar/Navbar";

type TLayout = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: TLayout) => {
  return (
    <div className="pt-16">
      <Navbar />
      {children}
    </div>
  );
};

export default AppLayout;
