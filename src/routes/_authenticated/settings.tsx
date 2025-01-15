import { createFileRoute } from "@tanstack/react-router";
import { useGetUserData } from "@/api/get";
import { pb } from "@/api/pocketbase";
import AppLayout from "@/components/layout/AppLayout";
import SettingsProfile from "@/components/settings/SettingsProfile";
import { cn } from "@/lib/utils";
import SettingsPassword from "@/components/settings/SettingsPassword";
import SettingsCommunities from "@/components/settings/SettingsCommunities";

type TQueries = {
  page?: string;
};

export const Route = createFileRoute("/_authenticated/settings")({
  component: () => (
    <AppLayout>
      <RouteComponent />
    </AppLayout>
  ),
  validateSearch: (search: Record<string, unknown>): TQueries => {
    return {
      page: search?.page as string,
    };
  },
});

const settingsList = [
  {
    id: 1,
    name: "profile",
  },
  {
    id: 2,
    name: "password",
  },
  {
    id: 3,
    name: "communities",
  },
];

function RouteComponent() {
  const navigate = Route.useNavigate();
  const { page } = Route.useSearch();
  const userId = pb.authStore.record?.id;
  const { data: userData } = useGetUserData(userId as string);

  const handleOpenSetting = (name: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        page: name,
      }),
    });
  };

  return (
    <div className="flex justify-center w-full gap-8 py-8 mx-auto max-md:flex-col max-w-1075">
      <div className="w-[372px] flex flex-col gap-0.5 max-md:w-full">
        {settingsList.map((item) => (
          <button
            onClick={() => handleOpenSetting(item.name)}
            className={cn(
              "flex items-center max-md:justify-center w-full hover:bg-light-gray h-12 px-4 font-bold capitalize rounded-lg bg-none text-dark-primary",
              item.name === page &&
                "bg-yellow-primary hover:bg-yellow-primary-hover",
              !page &&
                "first:bg-yellow-primary first:hover:bg-yellow-primary-hover"
            )}
            key={item.id}
            type="button"
          >
            {item.name}
          </button>
        ))}
      </div>

      {(!page || page === "profile") && (
        <SettingsProfile userData={userData} userId={userId} />
      )}

      {page === "password" && <SettingsPassword userId={userId} />}

      {page === "communities" && <SettingsCommunities />}
    </div>
  );
}
