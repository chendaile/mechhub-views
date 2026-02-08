import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils";

const inputVariants = cva(
    "flex w-full border text-[#334155] outline-none transition-all placeholder:text-[#94a3b8] disabled:cursor-not-allowed disabled:opacity-70",
    {
        variants: {
            variant: {
                default:
                    "border-[#e2e8f0] bg-[#f8fafc] focus:border-[#000000] focus:ring-1 focus:ring-[#000000]",
                ghost: "border-[#e2e8f0] bg-[#ffffff] focus:border-[#94a3b8] focus:ring-1 focus:ring-[#cbd5e1]",
            },
            inputSize: {
                sm: "px-3 py-2 text-sm rounded-[0.75rem]",
                md: "px-4 py-3 text-base rounded-[1rem]",
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
