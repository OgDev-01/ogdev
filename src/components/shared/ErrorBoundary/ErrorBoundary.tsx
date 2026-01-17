import { Link, useRouter } from "@tanstack/react-router";

import Button from "../Button/Button";
import Title from "../Typography/Title";
import Text from "../Typography/Text";

interface ErrorBoundaryProps {
  error: Error;
  reset?: () => void;
}

const ErrorBoundary = ({ error, reset }: ErrorBoundaryProps) => {
  const router = useRouter();

  const handleReset = () => {
    if (reset) {
      reset();
    } else {
      router.invalidate();
    }
  };

  return (
    <div className="container py-20 flex flex-col items-center justify-center min-h-[50vh]">
      <Title level={2} className="text-center">
        Something went wrong
      </Title>
      <Text className="text-center mt-4 max-w-md">
        {error.message || "An unexpected error occurred. Please try again."}
      </Text>
      <div className="flex gap-4 mt-8">
        <Button onClick={handleReset} variant="filled">
          Try again
        </Button>
        <Link to="/">
          <Button variant="outlined">Go home</Button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorBoundary;
