import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import "./checkbox.css";

const Checkbox = React.forwardRef(
  ({ className = "", ...props }, ref) => (
    <CheckboxPrimitive.Root
      ref={ref}
      className={`checkbox-root ${className}`}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="checkbox-indicator">
        <Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
