import React from "react";
import Ecclipse from "../shared/Ecclipse/Ecclipse";
import Text from "../shared/Typography/Text";
import Socials from "../shared/Socials/Socials";

const HeroSection = () => {
  return (
    <div className="container relative h-[calc(100vh-7rem)] flex justify-center pt-32 md:pt-40 overflow-visible">
      <div className="flex flex-col gap-6 md:gap-8 items-center">
        <h1
          className="text-5xl md:text-7xl lg:text-9xl font-bold text-center leading-[4rem] md:leading-[6rem] lg:leading-[8rem] 
      "
        >
          Ogbonna <br /> Sunday
        </h1>
        <Text className="text-center leading-5 md:text-xl md:w-4/5 mx-auto">
          Crafting the future with code, where each line paints a canvas of
          limitless possibilities, and every function tells a story of
          technological advancement
        </Text>

        <Text className="font-bold text-center md:text-xl">
          Software Engineer | Javascript Developer
        </Text>

        <div className="mt-8 mx-auto">
          <Socials />
        </div>
      </div>
      <Ecclipse classNames="absolute -left-28 top-40" />
      <Ecclipse classNames="absolute -right-28 bottom-40 " />
    </div>
  );
};

export default HeroSection;
