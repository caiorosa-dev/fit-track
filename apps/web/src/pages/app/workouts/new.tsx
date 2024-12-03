import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useApi } from "@/hooks/lib/use-api";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "@tanstack/react-router";
import { FullScreenPage } from "@/components/full-screen-page";

const createWorkoutSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  date: z.string().min(1, "A data é obrigatória"),
});

export const Route = createFileRoute("/app/workouts/new")({
  component: CreateWorkoutPage,
});

function CreateWorkoutPage() {
  const api = useApi();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createWorkoutSchema),
  });

  const onSubmit = async (data: unknown) => {
    setLoading(true);
    try {
      await api.post("/workouts", data);
      navigate({ to: "/" });
    } catch (error) {
      console.error("Erro ao criar treino:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FullScreenPage>
      <div className="max-w-xl w-full mx-auto pt-8">
        <h1 className="text-2xl mb-4">Criar Novo Treino</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-400">Nome do Treino</label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Nome do Treino" />}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message as string}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400">Data</label>
            <Controller
              name="date"
              control={control}
              render={({ field }) => <Input type="date" {...field} />}
            />
            {errors.date && <p className="text-red-500 text-sm">{errors.date.message as string}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Criando..." : "Criar Treino"}
          </Button>
        </form>

        <Link to="/">
          <Button className="w-full mt-4">Voltar para Home</Button>
        </Link>
      </div>
    </FullScreenPage>
  );
}
