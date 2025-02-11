import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { pb } from "@/api/pocketbase";

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

const welcomeMessage = `Welcome to the Tribe! 🎉 We're excited to have you on board! This is a portfolio project, a recreation of the popular website called Skool. If you have any questions or need help getting started, feel free to reach out. You can contact me directly at stefan.topallovic@gmail.com – I'm happy to assist! Enjoy using Tribe and have a great day!  🚀`;

const appOwnerId = import.meta.env.VITE_APP_OWNER_ID;

export const useAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userData = await pb
        .collection("users")
        .authWithPassword(email, password);
      navigate({ to: "/" });
      toast("Login Successful!", {
        description: "You have logged in successfully!",
      });

      // Send welcome message on first login
      if (userData?.record?.firstLogin === false) {
        const conversationData = await pb.collection("conversations").create({
          users: [appOwnerId, userData?.record?.id],
        });

        const newMessage = await pb.collection("messages").create({
          message: welcomeMessage,
          sender_id: appOwnerId as string,
          conversation: conversationData?.id as string,
          receiver_id: userData?.record?.id as string,
        });

        await pb
          .collection("conversations")
          .update(conversationData?.id as string, {
            messages: [...(conversationData?.messages || []), newMessage.id],
            seen: false,
          });

        await pb.collection("users").update(userData?.record.id, {
          firstLogin: true,
        });
      }
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
