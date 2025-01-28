import { FieldErrors } from "react-hook-form";
import { TCreateCommunitySubmitData } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { IconPhotoScan, IconUserFilled } from "@tabler/icons-react";

type TStepThreeProps = {
  errors: FieldErrors<TCreateCommunitySubmitData>;
  banner: File | null;
  avatar: File | null;
  handleBannerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CreateCommunityStepThree = ({
  avatar,
  banner,
  errors,
  handleAvatarChange,
  handleBannerChange,
}: TStepThreeProps) => {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <p className="mb-3 text-sm font-semibold">
        Select your community banner & avatar
      </p>
      <div className="relative flex items-center justify-center w-full h-40 overflow-hidden border rounded-lg bg-light-gray">
        {banner ? (
          <img
            alt="banner"
            src={URL.createObjectURL(banner)}
            className="object-cover w-full h-full"
          />
        ) : (
          <IconPhotoScan size={60} className="text-grayout" />
        )}
        <input
          data-testid="community-banner-input"
          onChange={handleBannerChange}
          type="file"
          accept="image/*"
          className="absolute top-0 bottom-0 left-0 right-0 z-10 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      <Avatar className="relative flex items-center justify-center w-20 h-20 -mt-6 overflow-hidden bg-white rounded-full">
        {avatar && (
          <AvatarImage
            className="object-cover w-20 h-20 border-4 border-white rounded-full"
            src={URL.createObjectURL(avatar)}
          />
        )}
        <AvatarFallback className="flex items-center justify-center w-full h-full border-4 border-white rounded-full cursor-pointer bg-light-gray">
          <IconUserFilled className="text-grayout" size={25} />
        </AvatarFallback>
        <input
          data-testid="community-image-input"
          onChange={handleAvatarChange}
          accept="image/*"
          type="file"
          className="absolute top-0 bottom-0 left-0 right-0 z-10 w-full h-full opacity-0 cursor-pointer"
        />
      </Avatar>
      {errors?.avatar && (
        <p className="mt-1 text-xs font-medium text-red-500">
          {errors?.avatar?.message}
        </p>
      )}
      {errors?.banner && (
        <p className="mt-1 text-xs font-medium text-red-500">
          {errors?.banner?.message}
        </p>
      )}
    </div>
  );
};

export default CreateCommunityStepThree;
