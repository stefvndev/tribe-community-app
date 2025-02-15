import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { IconLoader2 } from "@tabler/icons-react";
import { useAuth } from "@/lib/hooks/useAuth";
import Logo from "@/assets/tribe-logo.png";
import MainButton from "@/components/buttons/MainButton";

type TSubmitData = {
  email: string;
  password: string;
};

const validationSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export const Route = createFileRoute("/login")({
  beforeLoad: async ({ context }) => {
    const { isLogged } = context.authentication;
    if (isLogged()) {
      throw redirect({ to: "/" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { signIn, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSubmitData>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async (data: TSubmitData) => {
    const { email, password } = data;
    signIn(email, password);
  };

  return (
    <main className="flex items-center justify-center w-full h-full min-h-screen px-4 pb-6">
      <div className="flex flex-col items-center p-8  max-sm:w-full max-sm:text-center w-[452px] h-full bg-white rounded-xl shadow-custom">
        <Link
          to="/"
          className="mb-6 text-3xl font-bold max-sm:mx-auto text-dark-primary"
        >
          <img src={Logo} alt="Tribe" width={150} />
        </Link>
        <form
          data-testid="login-form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center w-full h-full gap-6"
        >
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
          <MainButton
            disabled={isLoading}
            type="submit"
            className="w-full h-12 mt-4"
          >
            {isLoading ? (
              <IconLoader2 className="animate-spin" size={22} />
            ) : (
              "Log in"
            )}
          </MainButton>
        </form>
        <p className="mt-5">
          Don't have an account?{" "}
          <Link to="/signup" className="text-link-blue hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
