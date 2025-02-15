import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import textListSignUp from "@/components/signup/textListLogin";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { IconLoader2 } from "@tabler/icons-react";
import { TSignUpData, useAuth } from "@/lib/hooks/useAuth";
import Logo from "@/assets/tribe-logo.png";
import MainButton from "@/components/buttons/MainButton";

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

export const Route = createFileRoute("/signup")({
  beforeLoad: async ({ context }) => {
    const { isLogged } = context.authentication;
    if (isLogged()) {
      throw redirect({ to: "/" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { signUp, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSubmitData>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = (data: TSubmitData) => {
    const formattedData: TSignUpData = {
      name: data?.name + " " + data?.last_name,
      email: data?.email,
      password: data?.password,
      passwordConfirm: data?.password,
      emailVisibility: true,
    };
    signUp(formattedData);
  };

  return (
    <main className="flex items-center justify-center w-full h-full min-h-screen px-4 pb-6">
      <div className="flex justify-between w-full h-full gap-5 max-lg:flex-col-reverse max-lg:gap-16 max-lg:mt-14 max-lg:items-center max-w-1075">
        <div className="flex flex-col items-start justify-center max-sm:text-center w-full max-w-[440px] max-sm:max-w-full">
          <Link
            to="/"
            className="text-4xl font-bold max-sm:mx-auto text-dark-primary"
          >
            <img src={Logo} alt="Tribe" width={170} />
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
            <div className="flex flex-col w-full gap-6">
              <Input
                autoComplete="off"
                data-testid="name-input"
                maxLength={14}
                {...register("name")}
                type="name"
                placeholder="First name"
                className="w-full h-[52px] border text-dark-primary font-base px-4 rounded-md"
                hasError={!!errors?.name?.message}
                errorMessage={errors?.name?.message}
              />
              <Input
                autoComplete="off"
                data-testid="lastname-input"
                maxLength={14}
                {...register("last_name")}
                type="last_name"
                placeholder="Last name"
                className="w-full h-[52px] border text-dark-primary font-base px-4 rounded-md"
                hasError={!!errors?.last_name?.message}
                errorMessage={errors?.last_name?.message}
              />
              <Input
                autoComplete="off"
                data-testid="email-input"
                {...register("email")}
                type="email"
                placeholder="Email"
                className="w-full h-[52px] border text-dark-primary font-base px-4 rounded-md"
                hasError={!!errors?.email?.message}
                errorMessage={errors?.email?.message}
              />
              <Input
                data-testid="password-input"
                {...register("password")}
                type="password"
                placeholder="Password"
                className="w-full h-[52px] border text-dark-primary font-base px-4 rounded-md"
                hasError={!!errors?.password?.message}
                errorMessage={errors?.password?.message}
              />
            </div>
            <MainButton
              disabled={isLoading}
              type="submit"
              className="w-full h-12 mt-2"
            >
              {isLoading ? (
                <IconLoader2 className="animate-spin" size={22} />
              ) : (
                "Sign up"
              )}
            </MainButton>
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
