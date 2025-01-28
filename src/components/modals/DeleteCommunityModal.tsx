import { useState } from "react";
import { useMutateDeleteCommunity } from "@/api/delete";
import { toast } from "sonner";
import { Route } from "@/routes/_authenticated/_community/$id/about";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useNavigate } from "@tanstack/react-router";
import { TCommunities } from "@/types/types";
import { cn } from "@/lib/utils";
import { IconLoader2 } from "@tabler/icons-react";

type TModalProps = {
  data?: TCommunities;
  isOwner: boolean;
};

const DeleteCommunityModal = ({ data, isOwner }: TModalProps) => {
  const navigate = useNavigate({ from: Route.fullPath });
  const [validName, setValidName] = useState("");
  const {
    mutateAsync: mutateAsyncDeleteCommunity,
    isPending: isDeletingPending,
  } = useMutateDeleteCommunity();

  const handleDeleteCommunity = async (communityId: string) => {
    if (!isOwner || validName !== data?.name) return;
    try {
      await mutateAsyncDeleteCommunity({ communityId });

      toast.success("Community deleted successfully!", {
        description:
          "Feel free to explore other communities or create a new one to keep the fun going!",
      });

      navigate({ to: "/" });
    } catch {
      toast.error("Failed to delete the community", {
        description: "Please try again later.",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          data-testid="delete-community-button"
          disabled={isDeletingPending}
          type="submit"
          className={cn(
            "flex items-center justify-center w-full h-12 px-4 mt-4 font-bold uppercase rounded-md bg-light-gray text-gray-500 hover:bg-gray-300"
          )}
        >
          {isDeletingPending ? (
            <IconLoader2 className="animate-spin" size={22} />
          ) : (
            "Delete community"
          )}
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete this community?</DialogTitle>
          <DialogDescription className="pb-4">
            No worries, you can always create a new one later! Just keep in mind
            this action can't be undone. Let us know if you're sure.
          </DialogDescription>
          <label className="flex flex-col w-full gap-1.5 pb-8">
            <p className="text-sm font-medium">
              Type "{`${data?.name}`}" below to confirm deletion
            </p>
            <Input
              data-testid="delete-community-input"
              defaultValue={validName}
              onChange={(e) => setValidName(e?.target?.value)}
              className="w-full h-10 border bg-gray-50"
              placeholder="Type the community name here"
            />
          </label>
          <button
            data-testid="delete-community-submit-button"
            onClick={() => handleDeleteCommunity(data?.id as string)}
            disabled={isDeletingPending || validName !== data?.name}
            type="submit"
            className={cn(
              "flex items-center justify-center w-full h-12 px-4 font-bold uppercase rounded-md bg-red-600 text-white hover:bg-red-700",
              (isDeletingPending || validName !== data?.name) &&
                "bg-light-gray text-gray-500 hover:bg-light-gray"
            )}
          >
            {isDeletingPending ? (
              <IconLoader2 className="animate-spin" size={22} />
            ) : (
              "Delete community"
            )}
          </button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCommunityModal;
