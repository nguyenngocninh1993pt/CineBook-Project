import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";
import "./separator.css";

const Separator = React.forwardRef(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "separator",
        orientation === "horizontal" ? "separator-horizontal" : "separator-vertical",
        className
      )}
      {...props}
    />
  )
);

Separator.displayName = "Separator";

export { Separator };
