import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { CountryDropdown } from "react-country-region-selector";
import { useGetUserData } from "@/api/get";
import { z } from "zod";
import { pb } from "@/api/pocketbase";
import AvatarIcon from "@/components/avatar/AvatarIcon";
import AppLayout from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useMutateUpdateUserProfile } from "@/api/patch";
import { toast } from "sonner";
import { IconLoader2 } from "@tabler/icons-react";

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

const MAX_FILE_SIZE = 5242880; // 5MB

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

type TSubmitData = {
  avatar?: File | null;
  name?: string;
  description?: string;
  location?: string;
};

const validationSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  description: z.string(),
  location: z.string(),
  avatar: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: `Avatar file size should be less than 5MB`,
    }),
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const { page } = Route.useSearch();
  const userId = pb.authStore.record?.id;
  const { data: userData } = useGetUserData(userId as string);
  const [avatar, setAvatar] = useState<File | null>(null);
  const { mutateAsync: mutateAsyncUpdateProfile, isPending } =
    useMutateUpdateUserProfile();

  const { register, handleSubmit, setValue, control, watch } =
    useForm<TSubmitData>({
      resolver: zodResolver(validationSchema),
    });

  const nameField = watch("name", "");

  const onSubmit = async (data: TSubmitData) => {
    try {
      const formData = new FormData();
      if (data.name) formData.append("name", data.name);
      if (data.description) formData.append("description", data.description);
      if (data.location) formData.append("location", data.location);
      if (data.avatar) formData.append("avatar", data.avatar as Blob);

      await mutateAsyncUpdateProfile({ formData, userId });
      toast.success("Profile updated successfully!", {
        description: "Your profile changes have been saved.",
      });
    } catch {
      toast.error("Update failed!", {
        description:
          "An error occurred while updating your profile. Please try again.",
      });
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setAvatar(file);
    setValue("avatar", file);
  };

  const handleOpenSetting = (name: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        page: name,
      }),
    });
  };

  useEffect(() => {
    if (userData) {
      setValue("name", userData.name || "");
      setValue("description", userData.description || "");
      setValue("location", userData.location || "");
    }
  }, [userData, setValue]);

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
      <div className="flex flex-col w-full gap-8 p-8 bg-white border rounded-lg">
        <h1 className="text-xl font-bold">Profile</h1>
        <div className="relative flex items-center gap-3">
          {avatar ? (
            <Avatar className="size-12">
              <AvatarImage
                className="object-cover rounded-full size-12"
                src={URL.createObjectURL(avatar)}
              />
            </Avatar>
          ) : (
            <AvatarIcon
              avatar={userData?.avatar}
              name={userData?.name || ""}
              id={userData?.id || ""}
              collectionName={userData?.collectionName || ""}
              className="rounded-full !size-12"
            />
          )}
          <input
            onChange={handleAvatarChange}
            accept="image/*"
            type="file"
            className="absolute bottom-0 left-0 right-0 z-10 w-full h-full -translate-y-1/2 opacity-0 cursor-pointer top-1/2"
          />
          <button className="text-base font-bold text-link-blue" type="submit">
            Change profile photo
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-8"
        >
          <div className="flex flex-col w-full gap-5">
            <label className="w-full">
              <p className="text-sm font-medium text-grayout mb-0.5">
                Full name
              </p>
              <Input
                {...register("name")}
                defaultValue={userData?.name}
                className="w-full border h-[52px] !text-base border-grayout/50"
                placeholder="Full name"
              />
            </label>
            <label className="w-full">
              <p className="text-sm font-medium text-grayout mb-0.5">Bio</p>
              <Textarea
                {...register("description")}
                defaultValue={userData?.description}
                className="w-full border h-20 !text-base border-grayout/50"
                placeholder="Bio"
              />
            </label>
            <label className="w-full">
              <p className="text-sm font-medium text-grayout mb-0.5">
                Location
              </p>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <CountryDropdown
                    value={field?.value}
                    onChange={field.onChange}
                    className="w-full border h-[52px] !text-base border-grayout/50 rounded-md px-3 text-dark-primary"
                  />
                )}
              />
            </label>
          </div>
          <button
            disabled={nameField === "" || isPending}
            type="submit"
            className={cn(
              "flex items-center w-[176px] max-md:w-full justify-center h-12 px-6 font-bold uppercase rounded-md bg-yellow-primary text-dark-primary hover:bg-yellow-primary-hover self-end disabled:bg-light-gray disabled:text-gray-500 disabled:hover:bg-light-gray"
            )}
          >
            {isPending ? (
              <IconLoader2 size={22} className="animate-spin" />
            ) : (
              "Update profile"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
