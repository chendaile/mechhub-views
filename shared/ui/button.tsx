import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 font-bold transition-all focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70",
    {
        variants: {
            variant: {
                primary:
                    "bg-[#000000] text-[#ffffff] shadow-lift hover:bg-[#1f2937]",
                outline:
                    "border-2 border-[#000000] text-[#000000] hover:bg-[#000000] hover:text-[#ffffff]",
                soft: "border border-[#e2e8f0] bg-[#ffffff] text-[#334155] hover:bg-[#f8fafc]",
                ghost: "text-[#475569] hover:bg-[#f1f5f9]",
                tab: "text-[#475569] hover:bg-transparent",
            },
            size: {
                sm: "px-4 py-2 text-sm rounded-[0.75rem]",
                md: "px-6 py-3 text-base rounded-[999px]",
                lg: "px-8 py-4 text-lg rounded-[999px]",
                icon: "h-12 w-12 rounded-[1rem]",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => (
        <button
            ref={ref}
            className={cn(buttonVariants({ variant, size }), className)}
            {...props}
        />
    ),
);

Button.displayName = "Button";

export { Button, buttonVariants };
