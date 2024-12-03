import { createFileRoute } from "@tanstack/react-router";
import { useMe } from "@/hooks/api/use-me";
import { Header } from "@/components/layout/header";
import { useApi } from "@/hooks/lib/use-api";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { DefaultLayout } from '@/components/layout/default-layout';
import { ProtectedRoute } from '@/components/auth/protected-route';

export const Route = createFileRoute("/app/")({
  component: IndexPage,
});

function IndexPage() {
  const { user, isLoading } = useMe();
  const api = useApi();

  const [workouts, setWorkouts] = useState([]);
  const [loadingWorkouts, setLoadingWorkouts] = useState(true);

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

  return (
    <ProtectedRoute>
      <DefaultLayout isLoading={isLoading || loadingWorkouts}>
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
              <Link to="/app/create-workout" className="no-underline">
                <Button className="mt-4">Criar Novo Treino</Button>
              </Link>
            </div>
          ) : (
            <div>{/* Renderize os treinos aqui */}</div>
          )}
        </div>
      </DefaultLayout>
    </ProtectedRoute>
  );
}
