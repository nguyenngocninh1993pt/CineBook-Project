import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import "./collapsible.css";

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = React.forwardRef(({ className = "", ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleTrigger
    ref={ref}
    className={`collapsible-trigger ${className}`}
    {...props}
  />
));
CollapsibleTrigger.displayName = "CollapsibleTrigger";

const CollapsibleContent = React.forwardRef(({ className = "", ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleContent
    ref={ref}
    className={`collapsible-content ${className}`}
    {...props}
  />
));
CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
