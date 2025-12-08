import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import "./dropdown-menu.css"; // import CSS thuần

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuSubContent = React.forwardRef((props, ref) => (
<DropdownMenuPrimitive.Portal>
<DropdownMenuPrimitive.SubContent ref={ref} className="dropdown-menu-sub-content" {...props} />
</DropdownMenuPrimitive.Portal>
));
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuContent = React.forwardRef((props, ref) => (
<DropdownMenuPrimitive.Portal>
<DropdownMenuPrimitive.Content ref={ref} className="dropdown-menu-content" {...props} />
</DropdownMenuPrimitive.Portal>
));

const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => (
<DropdownMenuPrimitive.Item
ref={ref}
className={["dropdown-menu-item", inset ? "inset" : "", className].filter(Boolean).join(" ")}
{...props}
/>
));

const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => (
<DropdownMenuPrimitive.SubTrigger
ref={ref}
className={["dropdown-menu-sub-trigger", inset ? "inset" : "", className].filter(Boolean).join(" ")}
{...props}

>

{children}

<ChevronRight className="chevron-right" />

</DropdownMenuPrimitive.SubTrigger>
));

const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => (
<DropdownMenuPrimitive.CheckboxItem
ref={ref}
className={["dropdown-menu-checkbox-item", className].filter(Boolean).join(" ")}
checked={checked}
{...props}

>

<span className="dropdown-menu-item-indicator">

  <DropdownMenuPrimitive.ItemIndicator>
    <Check />
  </DropdownMenuPrimitive.ItemIndicator>
</span>
{children}


</DropdownMenuPrimitive.CheckboxItem>
));

const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => (
<DropdownMenuPrimitive.RadioItem
ref={ref}
className={["dropdown-menu-radio-item", className].filter(Boolean).join(" ")}
{...props}

>

<span className="dropdown-menu-item-indicator">

  <DropdownMenuPrimitive.ItemIndicator>
    <Circle />
  </DropdownMenuPrimitive.ItemIndicator>
</span>
{children}

</DropdownMenuPrimitive.RadioItem>
));

const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => (
<DropdownMenuPrimitive.Label
ref={ref}
className={["dropdown-menu-label", inset ? "inset" : "", className].filter(Boolean).join(" ")}
{...props}
/>
));

const DropdownMenuSeparator = React.forwardRef((props, ref) => (
<DropdownMenuPrimitive.Separator ref={ref} className="dropdown-menu-separator" {...props} />
));

const DropdownMenuShortcut = ({ className, ...props }) => (
<span className={["dropdown-menu-shortcut", className].filter(Boolean).join(" ")} {...props} />
);

export {
DropdownMenu,
DropdownMenuTrigger,
DropdownMenuContent,
DropdownMenuItem,
DropdownMenuCheckboxItem,
DropdownMenuRadioItem,
DropdownMenuLabel,
DropdownMenuSeparator,
DropdownMenuShortcut,
DropdownMenuGroup,
DropdownMenuPortal,
DropdownMenuSub,
DropdownMenuSubTrigger,
DropdownMenuSubContent,
DropdownMenuRadioGroup,
};
