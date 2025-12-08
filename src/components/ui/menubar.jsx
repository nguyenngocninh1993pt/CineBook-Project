import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { cn } from "@/lib/utils";
import "./menubar.css";

const Menubar = React.forwardRef(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root ref={ref} className={cn("menubar", className)} {...props} />
));
Menubar.displayName = "Menubar";

const MenubarTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger ref={ref} className={cn("menubar-trigger", className)} {...props} />
));
MenubarTrigger.displayName = "MenubarTrigger";

const MenubarItem = React.forwardRef(({ className, ...props }, ref) => (
  <MenubarPrimitive.Item ref={ref} className={cn("menubar-item", className)} {...props} />
));
MenubarItem.displayName = "MenubarItem";

const MenubarLabel = React.forwardRef(({ className, ...props }, ref) => (
  <MenubarPrimitive.Label ref={ref} className={cn("menubar-label", className)} {...props} />
));
MenubarLabel.displayName = "MenubarLabel";

const MenubarSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator ref={ref} className={cn("menubar-separator", className)} {...props} />
));
MenubarSeparator.displayName = "MenubarSeparator";

const MenubarShortcut = ({ className, ...props }) => (
  <span className={cn("menubar-shortcut", className)} {...props} />
);
MenubarShortcut.displayName = "MenubarShortcut";

const MenubarPortal = MenubarPrimitive.Portal;
const MenubarSub = MenubarPrimitive.Sub;
const MenubarSubTrigger = MenubarPrimitive.SubTrigger;
const MenubarSubContent = MenubarPrimitive.SubContent;
const MenubarGroup = MenubarPrimitive.Group;
const MenubarRadioGroup = MenubarPrimitive.RadioGroup;
const MenubarRadioItem = MenubarPrimitive.RadioItem;
const MenubarCheckboxItem = MenubarPrimitive.CheckboxItem;
const MenubarMenu = MenubarPrimitive.Menu;
const MenubarContent = MenubarPrimitive.Content;

export {
  Menubar,
  MenubarTrigger,
  MenubarItem,
  MenubarLabel,
  MenubarSeparator,
  MenubarShortcut,
  MenubarPortal,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarGroup,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarCheckboxItem,
  MenubarMenu,
  MenubarContent,
};
