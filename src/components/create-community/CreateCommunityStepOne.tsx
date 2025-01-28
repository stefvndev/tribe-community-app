import { Input } from "../ui/input";
import Textarea from "../ui/textarea";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { TCreateCommunitySubmitData } from "@/types/types";
import MainButton from "../buttons/MainButton";

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
        data-testid="community-name-input"
        maxLength={20}
        {...register("name")}
        type="text"
        placeholder="Community name"
        className="w-full h-[52px] border text-dark-primary font-base px-4 rounded-md"
        hasError={!!errors?.name?.message}
        errorMessage={errors?.name?.message}
      />
      <Textarea
        data-testid="community-description-input"
        maxLength={2000}
        {...register("description")}
        placeholder="Describe your community (you can change this later)"
        className="w-full h-full px-4 border rounded-md max-h-20 text-dark-primary font-base"
        hasError={!!errors?.description?.message}
        errorMessage={errors?.description?.message}
      />

      <MainButton
        className="w-full h-12 mt-2 capitalize"
        type="button"
        onClick={handleFormSteps}
      >
        Next step
      </MainButton>
    </div>
  );
};

export default CreateCommunityStepOne;
