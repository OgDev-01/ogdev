import { cn } from "@/libs/utils";

const Ecclipse = ({ classNames }: { classNames?: string }) => {
  return (
    <div
      className={cn(
        "hidden md:inline-flex rounded-full py-24 px-36 bg-secondary-black/30 dark:bg-primary-white/20 blur-[90px] ",
        classNames
      )}
    ></div>
  );
};

export default Ecclipse;
