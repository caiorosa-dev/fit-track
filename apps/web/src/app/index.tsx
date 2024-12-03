import { createFileRoute } from "@tanstack/react-router";
import { useProtectedRoute } from "@/hooks/auth/use-protected-route";
import { useMe } from "@/hooks/api/use-me";
import { Header } from "@/components/layout/header";
import { Loading } from "@/components/loading";
import { useApi } from "@/hooks/lib/use-api";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { DefaultLayout } from '@/components/layout/default-layout';

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
    <DefaultLayout>
      <Header hideBackButton>
        <div>
          <p className="text-muted-foreground text-sm">Bem-vindo,</p>
          <h1>{user?.name ?? "Usuário"}</h1> {/* Proteção contra undefined */}
        </div>
      </Header>
      <div className="self-center flex-grow flex flex-col items-center justify-center">
        {workouts.length === 0 ? (
          <div className="text-center">
            <p className="text-secondary-foreground text-lg">Você não tem nenhum treino para hoje.</p>
            <Link to="/create-workout" className="no-underline">
              <Button className="mt-4">Criar Novo Treino</Button>
            </Link>
          </div>
        ) : (
          <div>{/* Renderize os treinos aqui */}</div>
        )}
      </div>
    </DefaultLayout>
  );
}
