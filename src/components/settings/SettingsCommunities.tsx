import ProfileCommunitiesList from "@/components/profile-community-list/ProfileCommunitiesList";

const SettingsCommunities = () => {
  return (
    <div className="flex flex-col w-full p-8 bg-white border rounded-lg max-sm:p-4">
      <h1 className="mb-6 text-xl font-bold">Communities</h1>
      <ProfileCommunitiesList />
    </div>
  );
};

export default SettingsCommunities;
