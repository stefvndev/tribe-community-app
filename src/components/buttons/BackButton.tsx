import { useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { IconArrowLeft } from "@tabler/icons-react";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      className="bg-yellow-primary text-dark-primary hover:bg-yellow-primary-hover"
      onClick={() => router.history.back()}
    >
      <IconArrowLeft />
      Back
    </Button>
  );
};

export default BackButton;
