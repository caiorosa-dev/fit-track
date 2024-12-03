import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Home, User, Dumbbell, BicepsFlexed } from "lucide-react";

type MobileNavProps = {
  className?: string;
};

type MobileNavLinkProps = {
  to: string;
  exact?: boolean;
  icon: React.ElementType;
  label: string;
};

function MobileNavLink({ to, icon: Icon, label, exact }: MobileNavLinkProps) {
  const isActive = exact ? window.location.pathname === to : window.location.pathname.startsWith(to);

  return (
    <li className={`group rounded-md w-12 h-12 flex justify-center items-center ${isActive ? 'bg-primary' : 'bg-transparent'}`}>
      <Link to={to} className={`flex flex-col items-center ${isActive ? 'text-white' : 'text-gray-600 dark:text-gray-300 hover:text-primary'}`}>
        <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'group-hover:text-primary'}`} />
        <span className={`text-xs ${isActive ? 'text-white' : 'group-hover:text-primary'}`}>{label}</span>
      </Link>
    </li>
  );
}

export function MobileNav({ className }: MobileNavProps) {
  return (
    <nav className={cn("w-full bg-slate-900 py-1", className)}>
      <ul className="flex justify-around items-center max-w-xl w-full mx-auto">
        <MobileNavLink to="/app" icon={Home} label="Home" exact />
        <MobileNavLink to="/app/workouts" icon={BicepsFlexed} label="Treinos" />
        <MobileNavLink to="/app/exercise" icon={Dumbbell} label="Exercícios" />
        <MobileNavLink to="/app/profile" icon={User} label="Perfil" />
      </ul>
    </nav>
  );
}
