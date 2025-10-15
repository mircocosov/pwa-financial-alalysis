"use client";

import * as React from "react";
import { cn } from "./utils";

interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string;
  onValueChange?: (value: string) => void;
}

const RadioGroupContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
}>({});

function RadioGroup({
  className,
  value,
  onValueChange,
  children,
  ...props
}: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div
        className={cn("grid gap-3", className)}
        role="radiogroup"
        {...props}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

interface RadioGroupItemProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'value'> {
  value: string;
}

function RadioGroupItem({
  className,
  value,
  children,
  ...props
}: RadioGroupItemProps) {
  const context = React.useContext(RadioGroupContext);
  const isChecked = context.value === value;

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isChecked}
      className={cn(
        "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aspect-square size-4 shrink-0 rounded-full border shadow-sm transition-colors outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 relative",
        className,
      )}
      onClick={() => context.onValueChange?.(value)}
      {...props}
    >
      {isChecked && (
        <div className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
      )}
      {children}
    </button>
  );
}

export { RadioGroup, RadioGroupItem };