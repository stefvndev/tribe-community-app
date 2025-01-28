import { useState } from "react";
import { useForm } from "react-hook-form";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import Logo from "@/assets/tribe-logo.png";
import CreateCommunityStepOne from "@/components/create-community/CreateCommunityStepOne";
import CreateCommunityStepThree from "@/components/create-community/CreateCommunityStepThree";
import CreateCommunityStepTwo from "@/components/create-community/CreateCommunityStepTwo";
import AppLayout from "@/components/layout/AppLayout";
import { TCreateCommunitySubmitData } from "@/types/types";
import { useMutateCreateCommunity } from "@/api/post";
import { IconLoader2 } from "@tabler/icons-react";
import useUserStore from "@/store/UserStore";
import MainButton from "@/components/buttons/MainButton";

const MAX_FILE_SIZE = 5242880; // 5MB

const validationSchema = z.object({
  name: z.string().min(4, "Name must be at least 4 characters"),
  description: z.string().min(4, "Description must be at least 4 characters"),
  category: z.string().min(1, "Category is required"),
  type: z.string().min(1, "Type is required"),
  price: z.string().min(1, "Price is required"),
  banner: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: `Banner file size should be less than 5MB`,
    }),
  avatar: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: `Avatar file size should be less than 5MB`,
    }),
});

export const Route = createFileRoute("/_authenticated/create-community")({
  component: () => (
    <AppLayout>
      <RouteComponent />
    </AppLayout>
  ),
});

function RouteComponent() {
  const [step, setStep] = useState(1);
  const [banner, setBanner] = useState<File | null>(null);
  const [avatar, setAvatar] = useState<File | null>(null);
  const { userId } = useUserStore();
  const navigate = useNavigate({ from: Route.fullPath });
  const { mutateAsync: mutateAsyncCreateCommunity, isPending } =
    useMutateCreateCommunity();

  const {
    register,
    handleSubmit,
    control,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<TCreateCommunitySubmitData>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async (data: TCreateCommunitySubmitData) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("type", data.type);
      formData.append("price", data.price);
      formData.append("createdBy", userId as string);
      formData.append("members", JSON.stringify([userId]));
      if (data.banner) formData.append("banner", data.banner as Blob);
      if (data.avatar) formData.append("avatar", data.avatar as Blob);

      const response = await mutateAsyncCreateCommunity({ formData });
      navigate({ to: `/${response?.id}` });
      toast("Congratulations!", {
        description: "Your community was created successfully",
        position: "top-right",
      });
    } catch {
      toast.error("Error!", {
        description: "Error, please try again.",
      });
    }
  };

  const handleFormSteps = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await trigger(["name", "description"]);
    } else if (step === 2) {
      isValid = await trigger(["category", "type", "price"]);
    }

    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setBanner(file);
    setValue("banner", file);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setAvatar(file);
    setValue("avatar", file);
  };

  return (
    <main className="flex items-center justify-center flex-col w-full h-full min-h-[calc(100dvh-64px)] pb-6">
      <h1 className="mb-5 text-2xl font-bold text-dark-primary">
        Create your community
      </h1>

      <div className="flex flex-col items-center p-8  max-sm:w-full max-sm:text-center w-[452px] h-full bg-white rounded-xl shadow-custom">
        <Link
          to="/"
          className="mb-6 text-3xl font-bold max-sm:mx-auto text-dark-primary"
        >
          <img src={Logo} alt="Tribe" width={130} />
        </Link>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center w-full h-full gap-6"
        >
          {step === 1 && (
            <CreateCommunityStepOne
              errors={errors}
              register={register}
              handleFormSteps={handleFormSteps}
            />
          )}

          {step === 2 && (
            <CreateCommunityStepTwo
              errors={errors}
              control={control}
              handleFormSteps={handleFormSteps}
            />
          )}

          {step === 3 && (
            <CreateCommunityStepThree
              errors={errors}
              avatar={avatar}
              banner={banner}
              handleAvatarChange={handleAvatarChange}
              handleBannerChange={handleBannerChange}
            />
          )}

          {step === 3 && (
            <MainButton
              disabled={isPending}
              type="submit"
              className="w-full h-12 mt-2 capitalize"
            >
              {isPending ? (
                <IconLoader2 className="animate-spin" size={22} />
              ) : (
                "Create community"
              )}
            </MainButton>
          )}
        </form>
      </div>
    </main>
  );
}
