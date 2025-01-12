import { useEffect } from "react";
import Navbar from "@/components/navbar/Navbar";

type TLayout = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: TLayout) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full h-full px-4 pt-16">
      <Navbar />
      {children}
    </div>
  );
};

export default AppLayout;
