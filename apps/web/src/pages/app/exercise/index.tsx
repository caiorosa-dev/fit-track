import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header"; 
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/loading";

export const Route = createFileRoute("/app/exercise/")({
  component: ExercisesPage,
});

function ExercisesPage() {
  const [exercises, setExercises] = useState([]); // Lista de exercícios
  const [selectedExercises, setSelectedExercises] = useState([]); // Exercícios selecionados
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulação de uma chamada à API ou carregamento do arquivo JSON
    const fetchExercises = async () => {
      try {
        const response = await fetch("/exercises.json"); // Ajuste para sua rota de API, se necessário
        const data = await response.json();
        setExercises(data);
      } catch (error) {
        console.error("Erro ao carregar exercícios:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExercises();
  }, []);

  // Adicionar ou remover um exercício da lista de seleção
  const handleExerciseToggle = (exercise) => {
    if (selectedExercises.some((e) => e.id === exercise.id)) {
      setSelectedExercises((prev) => prev.filter((e) => e.id !== exercise.id));
    } else {
      setSelectedExercises((prev) => [...prev, exercise]);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-xl w-full mx-auto pt-8">
      <Header>
        <h1 className="text-center text-2xl font-bold">Lista de Exercícios</h1>
      </Header>
      <ul className="mt-8 space-y-4">
        {exercises.map((exercise) => (
          <li key={exercise.id} className="flex justify-between items-center border rounded-md px-4 py-2">
            <div>
              <p className="text-lg font-medium">{exercise.name}</p>
              <p className="text-sm text-gray-500">{exercise.category}</p>
            </div>
            <Button
              onClick={() => handleExerciseToggle(exercise)}
              variant={selectedExercises.some((e) => e.id === exercise.id) ? "outline" : "default"}
            >
              {selectedExercises.some((e) => e.id === exercise.id) ? "Remover" : "Adicionar"}
            </Button>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <h2 className="text-xl font-bold text-center">Treino Selecionado</h2>
        {selectedExercises.length === 0 ? (
          <p className="text-center text-gray-500">Nenhum exercício selecionado.</p>
        ) : (
          <ul className="space-y-2 mt-4">
            {selectedExercises.map((exercise) => (
              <li key={exercise.id} className="text-center text-lg font-medium">
                {exercise.name}
              </li>
            ))}
          </ul>
        )}
        <div className="flex justify-center mt-6">
          <Button onClick={() => console.log(selectedExercises)}>Finalizar Treino</Button>
        </div>
      </div>
    </div>
  );
}
