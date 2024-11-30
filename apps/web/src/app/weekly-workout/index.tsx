import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useApi } from "@/hooks/lib/use-api";
import { Header } from "@/components/blocks/header";
import { Button } from "@/components/ui/button";
import { Line } from "react-chartjs-2"; 
import { Loading } from "@/components/loading";
import { Link } from "@tanstack/react-router";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

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
        const response = await api.get(`/workouts/weekly`);
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
    labels: workouts.map((workout) => workout.date),
    datasets: [
      {
        label: "Progresso semanal",
        data: workouts.map((workout) => workout.performance),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  return (
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
          <Line data={chartData} options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
              title: {
                display: true,
                text: "Progresso dos Treinos Semanais",
              },
            },
          }} />
        </div>
      )}
    </div>
  );
}
