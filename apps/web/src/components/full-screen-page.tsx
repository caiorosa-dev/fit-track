import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export function FullScreenPage({ children, className, gradient }: PropsWithChildren<{ className?: string; gradient?: boolean }>) {
  return (
    <main
      className={cn(
        "w-full min-h-screen h-full grid grid-rows-[1fr_auto]",
        gradient &&
        "bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-200 via-teal-700 to-slate-300 dark:from-slate-800 dark:via-teal-900 dark:to-slate-800",
        className,
      )}
    >
      {children}
    </main>
  );
}
