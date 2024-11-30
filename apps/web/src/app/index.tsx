import { createFileRoute } from "@tanstack/react-router";
import { useProtectedRoute } from "@/hooks/auth/use-protected-route";
import { useMe } from "@/hooks/api/use-me";
import { FullScreenPage } from "@/components/full-screen-page";
import { Header } from "@/components/blocks/header";
import { Loading } from "@/components/loading";
import { MobileNav } from "@/components/ui/mobile-nav";
import { useApi } from "@/hooks/lib/use-api";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  const { user, isLoading } = useMe();
  const api = useApi();
  const [workouts, setWorkouts] = useState([]);
  const [loadingWorkouts, setLoadingWorkouts] = useState(true);

  useProtectedRoute();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await api.get(`/workouts?date=${new Date().toISOString().split("T")[0]}`);
        setWorkouts(response.data);
      } catch (error) {
        console.error("Erro ao buscar treinos:", error);
      } finally {
        setLoadingWorkouts(false);
      }
    };
    fetchWorkouts();
  }, [api]);

  if (isLoading || loadingWorkouts) {
    return <Loading />;
  }

  return (
    <FullScreenPage className="" gradient>
      <div className="max-w-xl w-full mx-auto pt-8 flex flex-col justify-between h-full">
        <Header hideBackButton>
          <div>
            <p className="text-muted-foreground text-sm">Bem vindo,</p>
            <h1>{user.name}</h1>
          </div>
        </Header>
        <div className="flex-grow flex flex-col items-center justify-center">
          {workouts.length === 0 ? (
            <div className="text-center">
              <p className="text-muted-foreground text-lg">Você não tem nenhum treino para hoje.</p>
              <Link to="/create-workout" className="no-underline">
                <Button className="mt-4">Criar Novo Treino</Button>
              </Link>
            </div>
          ) : (
            <div>{/* Renderize os treinos aqui */}</div>
          )}
        </div>
        <MobileNav className="fixed bottom-3 left-1/2 transform -translate-x-1/2 w-full max-w-md flex justify-center gap-6 p-0 bg-transparent shadow-none" />
      </div>
    </FullScreenPage>
  );
}
