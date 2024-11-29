import { createFileRoute } from "@tanstack/react-router";
import { useProtectedRoute } from "@/hooks/auth/use-protected-route";
import { useMe } from "@/hooks/api/use-me";
import { FullScreenPage } from "@/components/full-screen-page";
import { Header } from "@/components/blocks/header";
import { Loading } from "@/components/loading";

export const Route = createFileRoute("/")({
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
