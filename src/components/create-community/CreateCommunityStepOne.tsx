import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import Textarea from "../ui/textarea";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { TCreateCommunitySubmitData } from "@/types/types";

type TStepOneProps = {
  register: UseFormRegister<TCreateCommunitySubmitData>;
  errors: FieldErrors<TCreateCommunitySubmitData>;
  handleFormSteps: () => void;
};

const CreateCommunityStepOne = ({
  register,
  errors,
  handleFormSteps,
}: TStepOneProps) => {
  return (
    <div className="flex flex-col items-center w-full h-full gap-6">
      <p className="-mb-2 text-sm font-semibold">
        Add community name and description
      </p>
      <Input
        {...register("name")}
        type="text"
        placeholder="Community name"
        className="w-full h-[52px] border text-dark-primary font-base px-4 rounded-md"
        hasError={!!errors?.name?.message}
        errorMessage={errors?.name?.message}
      />
      <Textarea
        {...register("description")}
        placeholder="Describe your community (you can change this later)"
        className="w-full h-full px-4 border rounded-md max-h-20 text-dark-primary font-base"
        hasError={!!errors?.description?.message}
        errorMessage={errors?.description?.message}
      />

      <button
        onClick={handleFormSteps}
        type="button"
        className={cn(
          "flex items-center justify-center w-full h-12 px-4 mt-2 font-bold rounded-md bg-yellow-primary text-dark-primary hover:bg-yellow-primary-hover"
        )}
      >
        Next step
      </button>
    </div>
  );
};

export default CreateCommunityStepOne;
