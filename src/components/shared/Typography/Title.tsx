import { cn } from "@/libs/utils";
import TypographyWrapper from "./Wrapper";

type FontWeight =
  | "thin"
  | "extralight"
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "black";

interface TitleProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5;
  title?: string;
  weight?: FontWeight;
  className?: string;
}

const weightClasses: Record<FontWeight, string> = {
  thin: "font-thin",
  extralight: "font-extralight",
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
  black: "font-black",
};

const Title: React.FC<TitleProps> = ({
  children,
  level = 1,
  weight = "medium",
  className,
  title,
  ...props
}) => {
  const TitleTag = `h${level}` as keyof React.JSX.IntrinsicElements;

  return (
    <TypographyWrapper>
      <TitleTag
        className={cn(className, weightClasses[weight])}
        title={title}
        {...props}
      >
        {children}
      </TitleTag>
    </TypographyWrapper>
  );
};

export default Title;
