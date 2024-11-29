import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Home, User, Dumbbell, BicepsFlexed } from "lucide-react";

type MobileNavProps = {
  className?: string;
};

export function MobileNav({ className }: MobileNavProps) {
  return (
    <nav className={cn("w-full", className)}>
      <ul className="flex justify-around items-center py-2">
        <li>
          <Link to="/" className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-primary">
            <Home className="h-4 w-4" />
            <span className="text-xs">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/" className="flex flex-col items-center text-gray-600 dark:text-gray-300">
            <BicepsFlexed className="h-4 w-4" />
            <span className="text-xs">Treinos</span>
          </Link>
        </li>
        <li>
          <Link to="/" className="flex flex-col items-center text-gray-600 dark:text-gray-300">
            <Dumbbell className="h-4 w-4" />
            <span className="text-xs">Exercícios</span>
          </Link>
        </li>
        <li>
          <Link to="/" className="flex flex-col items-center text-gray-600 dark:text-gray-300">
            <User className="h-4 w-4" />
            <span className="text-xs">Perfil</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
