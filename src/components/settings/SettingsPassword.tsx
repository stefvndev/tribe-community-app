import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useMutateUpdateUserProfile } from "@/api/patch";
import { Input } from "@/components/ui/input";
import useSignOut from "@/lib/hooks/useSignOut";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader2 } from "@tabler/icons-react";
import MainButton from "../buttons/MainButton";

type TSubmitData = {
  oldPassword: string;
  password: string;
  passwordConfirm: string;
};

type TSettingsPassword = {
  userId?: string;
};

const validationSchema = z
  .object({
    oldPassword: z.string().min(1, "Password is required field"),
    password: z
      .string()
      .min(6, "New password must be at least 6 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&]/,
        "Password must contain at least one special character (@, $, !, %, *, ?, &)"
      ),
    passwordConfirm: z.string().min(6, "Passwords must match"),
  })
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["passwordConfirm"],
      });
    }
  });

const SettingsPassword = ({ userId }: TSettingsPassword) => {
  const { signOut } = useSignOut();
  const { mutateAsync: mutateAsyncUpdateProfile, isPending } =
    useMutateUpdateUserProfile();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TSubmitData>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async (data: TSubmitData) => {
    try {
      await mutateAsyncUpdateProfile({
        userId,
        formData: data,
      });
      reset();
      signOut();
      toast.success("Profile updated successfully!", {
        description:
          "Your profile changes have been saved. Please log in again to apply the updates.",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const INVALID_OLD_PASSWORD = err?.data?.status === 400;

      if (INVALID_OLD_PASSWORD) {
        toast.error("Update failed!", {
          description:
            "The old password you entered is incorrect. Please try again.",
        });
      } else {
        toast.error("Update failed!", {
          description:
            "An error occurred while updating your password. Please try again.",
        });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full p-8 bg-white border rounded-lg"
    >
      <h1 className="mb-5 text-xl font-bold">Password</h1>
      <div className="flex flex-col w-full gap-6">
        <label className="w-full">
          <p className="text-sm font-medium text-grayout mb-0.5">
            Old password
          </p>
          <Input
            type="password"
            {...register("oldPassword")}
            className="w-full border h-[52px] !text-base border-grayout/50"
            placeholder="Enter your current password"
            hasError={!!errors?.oldPassword?.message}
            errorMessage={errors?.oldPassword?.message}
          />
        </label>
        <label className="w-full">
          <p className="text-sm font-medium text-grayout mb-0.5">
            New password
          </p>
          <Input
            type="password"
            {...register("password")}
            className="w-full border h-[52px] !text-base border-grayout/50"
            placeholder="Create a new password"
            hasError={!!errors?.password?.message}
            errorMessage={errors?.password?.message}
          />
        </label>
        <label className="w-full">
          <p className="text-sm font-medium text-grayout mb-0.5">
            Confirm new password
          </p>
          <Input
            type="password"
            {...register("passwordConfirm")}
            className="w-full border h-[52px] !text-base border-grayout/50"
            placeholder="Re-enter your new password"
            hasError={!!errors?.passwordConfirm?.message}
            errorMessage={errors?.passwordConfirm?.message}
          />
        </label>
      </div>
      <MainButton
        disabled={isPending}
        type="submit"
        className="self-end w-full h-12 px-6 mt-8"
      >
        {isPending ? (
          <IconLoader2 size={22} className="animate-spin" />
        ) : (
          "Update profile"
        )}
      </MainButton>
    </form>
  );
};

export default SettingsPassword;
