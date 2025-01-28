import { Control, Controller, FieldErrors } from "react-hook-form";
import { TCreateCommunitySubmitData } from "@/types/types";
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
import MainButton from "@/components/buttons/MainButton";

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
              data-testid="community-category-option"
              hasError={!!errors?.category?.message}
              errorMessage={errors?.category?.message}
              className="w-full h-[52px] border text-dark-primary font-base px-4 rounded-md"
            >
              <SelectValue placeholder="Select community category" />
            </SelectTrigger>
            <SelectContent className="max-h-64">
              {communityCategories.map((category) => (
                <SelectItem
                  data-testid={`option-${category.value}`}
                  key={category.value}
                  value={category.value}
                >
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
              data-testid="community-type-option"
              hasError={!!errors?.type?.message}
              errorMessage={errors?.type?.message}
              className="w-full h-[52px] border text-dark-primary font-base px-4 rounded-md"
            >
              <SelectValue placeholder="Select community type" />
            </SelectTrigger>
            <SelectContent className="max-h-64">
              {communityTypes.map((type) => (
                <SelectItem
                  data-testid={`option-${type.value}`}
                  key={type.value}
                  value={type.value}
                >
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
              data-testid="community-pricing-option"
              hasError={!!errors?.price?.message}
              errorMessage={errors?.price?.message}
              className="w-full h-[52px] border text-dark-primary font-base px-4 rounded-md"
            >
              <SelectValue placeholder="Select pricing option" />
            </SelectTrigger>
            <SelectContent className="max-h-64">
              {communityPrices.map((price) => (
                <SelectItem
                  data-testid={`option-${price.value}`}
                  key={price.value}
                  value={price.value}
                >
                  {price.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
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

export default CreateCommunityStepTwo;
