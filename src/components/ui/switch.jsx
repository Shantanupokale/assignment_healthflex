import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

function Switch({ className, ...props }) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border-2 border-transparent shadow-xs transition-all",
        "data-[state=checked]:bg-gray-600 data-[state=unchecked]:bg-gray-300 dark:data-[state=unchecked]:bg-gray-600",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block h-3 w-3 rounded-full bg-white shadow-lg ring-0 transition-transform ",
          "data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-1"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };