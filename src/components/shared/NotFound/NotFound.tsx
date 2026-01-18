import { Link, useRouter } from "@tanstack/react-router";
import { FiHome, FiArrowLeft } from "react-icons/fi";

import Button from "../Button/Button";
import Title from "../Typography/Title";
import Text from "../Typography/Text";

const NotFound = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.history.back();
  };

  return (
    <div className="container py-20 flex flex-col items-center justify-center min-h-[50vh]">
      <Title level={1} className="text-6xl md:text-8xl">
        404
      </Title>
      <Title level={2} className="text-center mt-4">
        Page not found
      </Title>
      <Text className="text-center mt-4 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </Text>
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <Button onClick={handleGoBack} variant="outlined" className="gap-2">
          <FiArrowLeft className="h-4 w-4" aria-hidden="true" />
          Go back
        </Button>
        <Link to="/">
          <Button variant="filled" className="gap-2">
            <FiHome className="h-4 w-4" aria-hidden="true" />
            Go home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
