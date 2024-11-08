import { createFileRoute, Link } from '@tanstack/react-router';
import { useProtectedRoute } from '@/hooks/auth/use-protected-route';
import { useMe } from '@/hooks/api/use-me';
import { FullScreenPage } from '@/components/full-screen-page';
import { NotebookTextIcon, PackageIcon, TagIcon, UserIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cva } from 'class-variance-authority';
import { Header } from '@/components/blocks/header';
import { Loading } from '@/components/loading';
import { Accordion } from '@/components/ui/accordion';

export const Route = createFileRoute('/')({
  component: IndexPage,
});

function IndexPage() {
  const { user, isLoading } = useMe();

  useProtectedRoute();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <FullScreenPage>
      <div className="max-w-xl w-full mx-auto pt-8 space-y-8">
        <Header hideBackButton>
          <div>
            <p className="text-muted-foreground text-sm">Bem vindo,</p>
            <h1>{user.name}</h1>
          </div>
        </Header>
      </div>
    </FullScreenPage>
  );
}

type NavCardProps = {
  color: 'indigo' | 'emerald' | 'orange' | 'teal';
  icon: React.FC<{ className?: string }>;
  title: string;
  description: string;
  href: string;
};

function NavCard({
  color,
  icon: Icon,
  title,
  description,
  href,
}: NavCardProps) {
  const iconContainerVariants = cva(
    'size-10 flex justify-center items-center rounded-lg border',
    {
      variants: {
        color: {
          indigo: 'bg-indigo-600/30 border-indigo-500/50',
          emerald: 'bg-emerald-600/30 border-emerald-500/50',
          orange: 'bg-orange-600/30 border-orange-500/50',
          teal: 'bg-teal-600/30 border-teal-500/50',
        },
      },
      defaultVariants: {
        color: 'indigo',
      },
    }
  );

  const iconVariants = cva('size-4', {
    variants: {
      color: {
        indigo: 'text-indigo-400',
        emerald: 'text-emerald-400',
        orange: 'text-orange-400',
        teal: 'text-teal-400',
      },
    },
  });

  const iconContainerClass = iconContainerVariants({ color });
  const iconClass = iconVariants({ color });

  return (
    <Link to={href}>
      <Card className="bg-accent/50 hover:bg-secondary transition-all h-full w-full">
        <CardContent className="pt-4 space-y-4">
          <div className={iconContainerClass}>
            <Icon className={iconClass} />
          </div>
          <div className="space-y-1">
            <CardTitle>{title}</CardTitle>
            <CardDescription className="text-xs">{description}</CardDescription>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
