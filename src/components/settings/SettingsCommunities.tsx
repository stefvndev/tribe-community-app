import ProfileCommunitiesList from "@/components/profile-community-list/ProfileCommunitiesList";
import useUserStore from "@/store/UserStore";

const SettingsCommunities = () => {
  const { userId } = useUserStore();

  return (
    <div className="flex flex-col w-full p-8 bg-white border rounded-lg max-sm:p-4">
      <h1 className="mb-6 text-xl font-bold">Communities</h1>
      <ProfileCommunitiesList id={userId} />
    </div>
  );
};

export default SettingsCommunities;
