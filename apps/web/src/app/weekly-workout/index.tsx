import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useApi } from "@/hooks/lib/use-api";
import { Header } from "@/components/blocks/header";
import { Button } from "@/components/ui/button";
import { Line } from "react-chartjs-2";
import { Loading } from "@/components/loading";
import { Link } from "@tanstack/react-router";
import { FullScreenPage } from "@/components/full-screen-page";

export const Route = createFileRoute("/weekly-workout/")({
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

  if (loading) {
    return <Loading />;
  }

  const chartData = {
    labels: workouts.map((workout) => workout.name),
    datasets: [
      {
        label: "Número de Sessões por Treino",
        data: workouts.map((workout) => workout.workoutSessions?.length || 0),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  };

  return (
    <FullScreenPage className="" gradient>
    <div className="max-w-xl w-full mx-auto pt-8">
      <Header>
        <h1>Treinos da Semana</h1>
      </Header>
      {workouts.length === 0 ? (
        <div className="text-center mt-8">
          <p className="text-muted-foreground text-lg">
            Você não tem nenhum treino registrado nesta semana.
          </p>
          <Link to="/create-workout" className="no-underline">
            <Button className="mt-4">Criar Novo Treino</Button>
          </Link>
        </div>
      ) : (
        <div className="mt-8">
          <Line data={chartData} />
        </div>
      )}
    </div>
    </FullScreenPage>
  );
}
