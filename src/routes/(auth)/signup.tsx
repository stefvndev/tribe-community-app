import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import PocketBase from "pocketbase";
import { createFileRoute, Link } from "@tanstack/react-router";
import textListSignUp from "@/components/signup/textListLogin";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { IconLoader2 } from "@tabler/icons-react";

type TSubmitData = {
  name: string;
  last_name: string;
  email: string;
  password: string;
};

const validationSchema = z.object({
  name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@, $, !, %, *, ?, &)"
    ),
});

const SIGNUP_ERRORS = {
  VALIDATION_REQUIRED: "validation_required",
  VALIDATION_NOT_UNIQUE: "validation_not_unique",
};

export const Route = createFileRoute("/(auth)/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  const pb = useMemo(
    () => new PocketBase(import.meta.env.VITE_API_BASE_URL),
    []
  );
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSubmitData>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async (data: TSubmitData) => {
    const formattedData = {
      name: data?.name + " " + data?.last_name,
      email: data?.email,
      password: data?.password,
      passwordConfirm: data?.password,
      emailVisibility: true,
    };
    try {
      await pb.collection("users").create(formattedData);
      toast("Account created!", {
        description: "Your account has been created successfully!",
      });
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorData = err?.data;
      if (
        errorData?.data?.email?.code === SIGNUP_ERRORS.VALIDATION_NOT_UNIQUE
      ) {
        toast.error("Email already exists", {
          description: "The email address is already in use.",
        });
      } else {
        toast.error("Error", {
          description: "Something went wrong. Please try again later.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center px-4 pb-6 min-h-[calc(100vh-64px)] justify-center w-full h-full">
      <div className="flex justify-between w-full h-full gap-5 max-lg:flex-col-reverse max-lg:gap-16 max-lg:mt-14 max-lg:items-center max-w-1075">
        <div className="flex flex-col items-start justify-center max-sm:text-center w-full max-w-[440px] max-sm:max-w-full">
          <Link
            to="/"
            className="text-4xl font-bold max-sm:mx-auto text-dark-primary"
          >
            Tribe
          </Link>
          <h1 className="text-2xl font-bold my-7 text-dark-text">
            Everything you need to build community and make money online.
          </h1>
          <ul className="flex flex-col gap-6 mt-2 text-lg font-medium max-sm:mx-auto">
            {textListSignUp?.map((item) => (
              <li
                className="flex gap-4 sm:items-center max-sm:mx-auto"
                key={item.id}
              >
                <p>{item.icon}</p>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center p-8  max-sm:w-full max-sm:text-center w-[452px] h-full bg-white rounded-xl shadow-custom">
          <h2 className="mb-8 text-2xl font-bold text-dark-primary">
            Create your Tribe account
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center w-full h-full gap-4"
          >
            <div className="flex flex-col w-full gap-4">
              <label className="flex flex-col w-full gap-1">
                <Input
                  {...register("name")}
                  type="name"
                  placeholder="First name"
                  className="w-full h-[52px] border text-dark-primary font-base px-4 rounded-md"
                  hasError={!!errors?.name?.message}
                />
                <p
                  className={cn(
                    !errors?.name?.message && "hidden",
                    "flex text-xs font-medium text-red-600"
                  )}
                >
                  {errors?.name?.message}
                </p>
              </label>
              <label className="flex flex-col w-full gap-1">
                <Input
                  {...register("last_name")}
                  type="last_name"
                  placeholder="Last name"
                  className="w-full h-[52px] border text-dark-primary font-base px-4 rounded-md"
                  hasError={!!errors?.last_name?.message}
                />
                <p
                  className={cn(
                    !errors?.last_name?.message && "hidden",
                    "flex text-xs font-medium text-red-600"
                  )}
                >
                  {errors?.last_name?.message}
                </p>
              </label>
              <label className="flex flex-col w-full gap-1">
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="Email"
                  className="w-full h-[52px] border text-dark-primary font-base px-4 rounded-md"
                  hasError={!!errors?.email?.message}
                />
                <p
                  className={cn(
                    !errors?.email?.message && "hidden",
                    "flex text-xs font-medium text-red-600"
                  )}
                >
                  {errors?.email?.message}
                </p>
              </label>
              <label className="flex flex-col w-full gap-1">
                <Input
                  {...register("password")}
                  type="password"
                  placeholder="Password"
                  className="w-full h-[52px] border text-dark-primary font-base px-4 rounded-md"
                  hasError={!!errors?.password?.message}
                />
                <p
                  className={cn(
                    !errors?.password?.message && "hidden",
                    "flex text-xs font-medium text-red-600"
                  )}
                >
                  {errors?.password?.message}
                </p>
              </label>
            </div>
            <button
              disabled={loading}
              type="submit"
              className={cn(
                "flex items-center justify-center w-full h-12 px-4 mt-2 font-bold uppercase rounded-md bg-yellow-primary text-dark-primary hover:bg-yellow-primary-hover",
                loading && "bg-light-gray text-gray-500 hover:bg-light-gray"
              )}
            >
              {loading ? (
                <IconLoader2 className="animate-spin" size={22} />
              ) : (
                "Sign up"
              )}
            </button>
          </form>
          <p className="mt-5">
            Already have an account?{" "}
            <Link to="/login" className="text-link-blue hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
