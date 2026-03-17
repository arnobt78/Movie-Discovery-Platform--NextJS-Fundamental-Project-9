import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline";
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variant === "default" &&
          "border border-gray-200 bg-gray-100 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300",
        variant === "secondary" &&
          "border border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300",
        variant === "outline" &&
          "border border-gray-200 text-gray-700 dark:border-gray-600 dark:text-gray-300",
        className
      )}
      {...props}
    />
  )
);
Badge.displayName = "Badge";

export { Badge };
