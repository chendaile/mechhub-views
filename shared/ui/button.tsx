import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 font-bold transition-all focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70",
    {
        variants: {
            variant: {
                primary:
                    "bg-ink text-on-ink shadow-lift hover:bg-ink-hover",
                outline:
                    "border-2 border-ink text-ink hover:bg-ink hover:text-on-ink",
                soft: "border border-border-subtle bg-surface text-text-secondary hover:bg-fill-muted",
                ghost: "text-text-muted hover:bg-fill-soft",
                tab: "text-text-muted hover:bg-transparent",
            },
            size: {
                sm: "px-4 py-2 text-sm rounded-md",
                md: "px-6 py-3 text-base rounded-pill",
                lg: "px-8 py-4 text-lg rounded-pill",
                icon: "h-12 w-12 rounded-lg",
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
