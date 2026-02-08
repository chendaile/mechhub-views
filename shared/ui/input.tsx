import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils";

const inputVariants = cva(
    "flex w-full border text-text-secondary outline-none transition-all placeholder:text-text-faint disabled:cursor-not-allowed disabled:opacity-70",
    {
        variants: {
            variant: {
                default:
                    "border-border-subtle bg-fill-muted focus:border-ink focus:ring-1 focus:ring-ink",
                ghost: "border-border-subtle bg-surface focus:border-text-faint focus:ring-1 focus:ring-focus-ring",
            },
            inputSize: {
                sm: "px-3 py-2 text-sm rounded-md",
                md: "px-4 py-3 text-base rounded-lg",
            },
        },
        defaultVariants: {
            variant: "default",
            inputSize: "md",
        },
    },
);

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
        VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type = "text", variant, inputSize, ...props }, ref) => (
        <input
            type={type}
            className={cn(inputVariants({ variant, inputSize }), className)}
            ref={ref}
            {...props}
        />
    ),
);

Input.displayName = "Input";

export { Input, inputVariants };
