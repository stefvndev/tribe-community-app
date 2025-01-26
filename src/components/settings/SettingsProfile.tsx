import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader2 } from "@tabler/icons-react";
import { CountryDropdown } from "react-country-region-selector";
import { useMutateUpdateUserProfile } from "@/api/patch";
import { toast } from "sonner";
import AvatarIcon from "@/components/avatar/AvatarIcon";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import { z } from "zod";
import { TUserData } from "@/types/types";
import MainButton from "../buttons/MainButton";

type TSubmitData = {
  avatar?: File | null;
  name?: string;
  description?: string;
  location?: string;
};

type TSettingsProfile = {
  userData?: TUserData;
  userId?: string;
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

const MAX_FILE_SIZE = 5242880; // 5MB

const SettingsProfile = ({ userData, userId }: TSettingsProfile) => {
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

  useEffect(() => {
    if (userData) {
      setValue("name", userData.name || "");
      setValue("description", userData.description || "");
      setValue("location", userData.location || "");
    }
  }, [userData, setValue]);

  return (
    <div className="flex flex-col w-full gap-8 p-8 bg-white border rounded-lg">
      <h1 className="text-xl font-bold">Profile</h1>
      <div className="relative flex items-center gap-3 w-fit">
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
            <p className="text-sm font-medium text-grayout mb-0.5">Full name</p>
            <Input
              maxLength={28}
              {...register("name")}
              defaultValue={userData?.name}
              className="w-full border h-[52px] !text-base border-grayout/50"
              placeholder="Full name"
            />
          </label>
          <label className="w-full">
            <p className="text-sm font-medium text-grayout mb-0.5">Bio</p>
            <Textarea
              maxLength={100}
              {...register("description")}
              defaultValue={userData?.description}
              className="w-full border h-20 !text-base border-grayout/50"
              placeholder="Bio"
            />
          </label>
          <label className="w-full">
            <p className="text-sm font-medium text-grayout mb-0.5">Location</p>
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
        <MainButton
          disabled={nameField === "" || isPending}
          type="submit"
          className="self-end h-12 px-6 w-[177px] max-md:w-full "
        >
          {isPending ? (
            <IconLoader2 size={22} className="animate-spin" />
          ) : (
            "Update profile"
          )}
        </MainButton>
      </form>
    </div>
  );
};

export default SettingsProfile;
