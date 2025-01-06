type TLayout = {
  children: React.ReactNode;
};

const CommunityLayout = ({ children }: TLayout) => {
  return <div className="pt-16">{children}</div>;
};

export default CommunityLayout;
