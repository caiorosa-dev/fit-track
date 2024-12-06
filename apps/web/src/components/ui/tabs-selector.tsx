import * as React from "react";
import { cn } from "@/lib/utils";

type TabSelectorProps = {
  value: number;
  onChange: (value: number) => void;
  options: { label: string; value: number }[];
};

export function TabSelector({ value, onChange, options }: TabSelectorProps) {
  return (
    <div className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
      {options.map((option) => (
        <TabSelectorItem
          key={option.value}
          isActive={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </TabSelectorItem>
      ))}
    </div>
  );
}

type TabSelectorItemProps = {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

export function TabSelectorItem({
  isActive,
  onClick,
  children,
}: TabSelectorItemProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive && 'text-primary-foreground bg-primary'
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

