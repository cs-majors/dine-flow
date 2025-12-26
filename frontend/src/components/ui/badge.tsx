import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground border-border",
        // Status variants for orders
        success: "border-transparent bg-success text-success-foreground",
        warning: "border-transparent bg-warning text-warning-foreground",
        info: "border-transparent bg-info text-info-foreground",
        // Order status badges
        "status-new": "border-transparent bg-status-new text-primary-foreground",
        "status-preparing": "border-transparent bg-status-preparing text-accent-foreground",
        "status-ready": "border-transparent bg-status-ready text-success-foreground",
        "status-served": "border-transparent bg-status-served text-primary-foreground",
        "status-cancelled": "border-transparent bg-status-cancelled text-destructive-foreground",
        // Dietary badges
        veg: "border-transparent bg-success/15 text-success",
        "non-veg": "border-transparent bg-destructive/15 text-destructive",
        vegan: "border-transparent bg-primary/15 text-primary",
        // Accent badge
        accent: "border-transparent bg-accent text-accent-foreground",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-[10px]",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

export { Badge, badgeVariants };
