import { Link, useRouter } from "@tanstack/react-router";
import { FiAlertTriangle, FiRefreshCw, FiHome } from "react-icons/fi";

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

  // Check if it's a network error
  const isNetworkError =
    error.message.includes("fetch") ||
    error.message.includes("network") ||
    error.message.includes("Failed to load");

  return (
    <div className="container py-20 flex flex-col items-center justify-center min-h-[50vh]">
      {/* Error Icon */}
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
        <FiAlertTriangle
          className="h-8 w-8 text-red-600 dark:text-red-400"
          aria-hidden="true"
        />
      </div>

      <Title level={2} className="text-center">
        {isNetworkError ? "Connection Error" : "Something went wrong"}
      </Title>

      <Text className="text-center mt-4 max-w-md">
        {isNetworkError
          ? "Unable to connect. Please check your internet connection and try again."
          : error.message || "An unexpected error occurred. Please try again."}
      </Text>

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <Button onClick={handleReset} variant="filled" className="gap-2">
          <FiRefreshCw className="h-4 w-4" aria-hidden="true" />
          Try again
        </Button>
        <Link to="/">
          <Button variant="outlined" className="gap-2">
            <FiHome className="h-4 w-4" aria-hidden="true" />
            Go home
          </Button>
        </Link>
      </div>

      {/* Error details (collapsed by default in production) */}
      {import.meta.env.DEV && error.stack && (
        <details className="mt-8 w-full max-w-2xl">
          <summary className="cursor-pointer text-sm text-secondary-black/50 dark:text-primary-white/50 hover:text-secondary-black dark:hover:text-primary-white">
            Error details (development only)
          </summary>
          <pre className="mt-2 overflow-auto rounded-lg bg-secondary-black/5 p-4 text-xs text-secondary-black/70 dark:bg-primary-white/5 dark:text-primary-white/70">
            {error.stack}
          </pre>
        </details>
      )}
    </div>
  );
};

export default ErrorBoundary;
