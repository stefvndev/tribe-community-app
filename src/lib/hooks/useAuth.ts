import { useState } from "react";
import { pb } from "@/api/pocketbase";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export type TSignUpData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  emailVisibility: boolean;
};

const SIGNUP_ERRORS = {
  VALIDATION_REQUIRED: "validation_required",
  VALIDATION_NOT_UNIQUE: "validation_not_unique",
};

export const useAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await pb.collection("users").authWithPassword(email, password);
      navigate({ to: "/" });
      toast("Login Successful!", {
        description: "You have logged in successfully!",
      });
    } catch {
      toast.error("Login Failed!", {
        description: "Please check your credentials and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (data: TSignUpData) => {
    setIsLoading(true);
    try {
      await pb.collection("users").create(data);
      toast("Account Created!", {
        description:
          "Your account has been created successfully! You can now log in using your credentials.",
      });
      navigate({ to: "/login" });
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
      setIsLoading(false);
    }
  };

  return { signIn, signUp, isLoading };
};

export type AuthContext = ReturnType<typeof useAuth>;
