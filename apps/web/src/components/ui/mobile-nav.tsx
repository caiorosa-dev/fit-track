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

function MobileNavLink({ to, icon: Icon, label }: MobileNavLinkProps) {
  const isActive = window.location.pathname === to;

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
      <ul className="flex justify-around items-center py-2 max-w-xl w-full mx-auto">
        <MobileNavLink to="/" icon={Home} label="Home" exact />
        <MobileNavLink to="/weekly-workout" icon={BicepsFlexed} label="Treinos" />
        <MobileNavLink to="/exercise" icon={Dumbbell} label="Exercícios" />
        <MobileNavLink to="/profile" icon={User} label="Perfil" />
      </ul>
    </nav>
  );
}
