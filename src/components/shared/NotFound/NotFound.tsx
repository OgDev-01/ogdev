import { Link } from "@tanstack/react-router";

import Button from "../Button/Button";
import Title from "../Typography/Title";
import Text from "../Typography/Text";

const NotFound = () => {
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
      <Link to="/" className="mt-8">
        <Button variant="filled">Go home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
