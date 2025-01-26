import { useEffect } from "react";
import Navbar from "@/components/navbar/Navbar";
import useUserStore from "@/store/UserStore";
import { pb } from "@/api/pocketbase";

type TLayout = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: TLayout) => {
  const { setUserId } = useUserStore();
  const userId = pb.authStore.record?.id;

  useEffect(() => {
    setUserId(userId);
  }, [userId]);

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
