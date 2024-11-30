import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function Logo({ className }: Props) {
  return (
    <>
      <img src="/logo-light.png" alt="FitTrack" className={cn("h-10 dark:hidden", className)} />
      <img src="/logo-dark.png" alt="FitTrack" className={cn("h-10 hidden dark:block", className)} />
    </>
  );
}