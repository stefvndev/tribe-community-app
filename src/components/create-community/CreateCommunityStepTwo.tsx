import { TCreateCommunitySubmitData } from "@/types/types";
import { Control, Controller, FieldErrors } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  communityCategories,
  communityPrices,
  communityTypes,
} from "@/components/create-community/fieldsData";
import { cn } from "@/lib/utils";

type TStepTwoProps = {
  control: Control<TCreateCommunitySubmitData>;
  errors: FieldErrors<TCreateCommunitySubmitData>;
  handleFormSteps: () => void;
};

const CreateCommunityStepTwo = ({
  control,
  errors,
  handleFormSteps,
}: TStepTwoProps) => {
  return (
    <div className="flex flex-col items-center w-full h-full gap-6">
      <p className="-mb-2 text-sm font-semibold">
        Select your community category, type and pricing
      </p>
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger
              hasError={!!errors?.category?.message}
              errorMessage={errors?.category?.message}
              className="w-full h-[52px] border text-dark-primary font-base px-4 rounded-md"
            >
              <SelectValue placeholder="Select community category" />
            </SelectTrigger>
            <SelectContent className="max-h-64">
              {communityCategories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger
              hasError={!!errors?.type?.message}
              errorMessage={errors?.type?.message}
              className="w-full h-[52px] border text-dark-primary font-base px-4 rounded-md"
            >
              <SelectValue placeholder="Select community type" />
            </SelectTrigger>
            <SelectContent className="max-h-64">
              {communityTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      <Controller
        name="price"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger
              hasError={!!errors?.price?.message}
              errorMessage={errors?.price?.message}
              className="w-full h-[52px] border text-dark-primary font-base px-4 rounded-md"
            >
              <SelectValue placeholder="Select pricing option" />
            </SelectTrigger>
            <SelectContent className="max-h-64">
              {communityPrices.map((price) => (
                <SelectItem key={price.value} value={price.value}>
                  {price.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
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

export default CreateCommunityStepTwo;
