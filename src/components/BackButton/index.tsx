"use client";
import { usePathname, useRouter } from "next/navigation";
import { GoArrowLeft } from "react-icons/go";
import { ignoredPaths } from "../shared/PageTitle";

const BackButton = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleRouteBack = () => {
    router.back();
  };

  if (ignoredPaths.includes(pathname)) return null;

  return (
    <div className="container pt-16 md:pt-24">
      <button
        onClick={handleRouteBack}
        className="flex text-primary-button dark:text-white text-base  items-center gap-2"
      >
        <GoArrowLeft className="md:text-2xl" />
        <span>Back</span>
      </button>
    </div>
  );
};

export default BackButton;
