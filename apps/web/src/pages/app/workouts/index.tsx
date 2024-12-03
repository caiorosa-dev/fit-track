import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useApi } from "@/hooks/lib/use-api";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { DefaultLayout } from '@/components/layout/default-layout';

export const Route = createFileRoute("/app/workouts/")({
  component: WeeklyWorkoutsPage,
});

function WeeklyWorkoutsPage() {
  const api = useApi();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await api.get("/workouts/weekly");
        setWorkouts(response.data);
      } catch (error) {
        console.error("Erro ao buscar treinos semanais:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkouts();
  }, [api]);

  return (
    <DefaultLayout isLoading={loading}>
      <Header>
        <h1>Treinos da Semana</h1>
      </Header>
      {workouts.length === 0 ? (
        <div className="text-center mt-8 self-center">
          <p className="text-muted-foreground text-lg">
            Você não tem nenhum treino registrado nesta semana.
          </p>
          <Link to="/app/workouts/new" className="no-underline">
            <Button className="mt-4">Criar Novo Treino</Button>
          </Link>
        </div>
      ) : (
        <div className="mt-8">

        </div>
      )}
    </DefaultLayout>
  );
}
