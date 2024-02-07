import * as React from "react";
import { cn } from "@/libs/utils";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center  text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        outlined:
          "bg-transparent h-10 py-2 px-7 font-chivo border rounded-3xl border-secondary-button text-secondary-button hover:bg-secondary-button hover:text-white  dark:border-slate-700 dark:text-slate-100",
        filled:
          "bg-secondary-button border border-secondary-button  h-10 py-2 px-7 rounded-3xl text-white hover:bg-transparent hover:text-secondary-button dark:bg-slate-700 dark:text-slate-100",
      },
    },
    defaultVariants: {
      variant: "filled",
    },
  }
);
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isPrimary?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, isPrimary = false, ...props }, ref) => {
    switch (isPrimary) {
      case true:
        return (
          <button
            className={cn(buttonVariants({ variant, className }))}
            ref={ref}
            {...props}
          />
        );
      default:
        return (
          <button
            {...props}
            ref={ref}
            className={cn(
              "text-primary-button h-10 text-xl md:text-3xl font-chivo font-bold flex items-center gap-4",
              className
            )}
          >
            {props.children} <BsArrowUpRightCircle />
          </button>
        );
    }
  }
);
Button.displayName = "Button";

export default Button;
