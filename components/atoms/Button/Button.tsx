import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/base/libs/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center  text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:hover:bg-slate-800 dark:hover:text-slate-100 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800",
    {
        variants: {
            variant: {
                outlined:
                    "bg-transparent h-10 py-2 px-7 font-chivo border rounded-3xl border-secondary-button text-secondary-button hover:bg-secondary-button hover:text-white  dark:border-slate-700 dark:text-slate-100",
                filled: "bg-secondary-button border border-secondary-button  h-10 py-2 px-7 rounded-3xl text-white hover:bg-transparent hover:text-secondary-button dark:bg-slate-700 dark:text-slate-100"
            }
        },
        defaultVariants: {
            variant: "outlined"
        }
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
