import { createFileRoute } from "@tanstack/react-router";
import * as z from "zod";
import { useApi } from "@/hooks/lib/use-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "@tanstack/react-router";
import { DefaultLayout } from "@/components/layout/default-layout";
import { Header } from "@/components/layout/header";
import { useZodForm } from "@/hooks/lib/use-zod-form";
import { Form, FormItem, FormLabel, FormControl, FormMessage, FormField } from "@/components/ui/form";
import { TabSelector } from "@/components/ui/tabs-selector";
import { toast } from "sonner";
import { WEEKDAYS_OPTIONS } from "@/lib/week-days";

const createWorkoutSchema = z.object({
  name: z.string().min(1, "O nome do treino é obrigatório"),
  weekday: z.number().min(0, "O dia da semana é obrigatório"),
});

export const Route = createFileRoute("/app/workouts/new")({
  component: CreateWorkoutPage,
});

function CreateWorkoutPage() {
  const api = useApi();
  const navigate = useNavigate();

  const form = useZodForm({
    schema: createWorkoutSchema,
    defaultValues: {
      weekday: new Date().getDay(),
    },
    handler: async (data) => {
      await api.post("/workouts", {
        ...data,
        exercises: [],
      });
    },
    onSubmitError: (error) => {
      console.error(error);
      toast.error("Erro ao criar o treino");
    },
    onSubmitSuccess: () => {
      navigate({ to: "/app/workouts" });
    },
  });

  return (
    <DefaultLayout>
      <Header backUrl="/app/workouts">
        <h1>Criar novo treino</h1>
      </Header>
      <Form {...form} className="grid gap-4 self-center">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Treino</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Costas do Cbum" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="weekday"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dia da semana</FormLabel>
              <FormControl>
                <TabSelector value={field.value} onChange={field.onChange} options={WEEKDAYS_OPTIONS} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={form.isSubmitting || !form.formState.isValid}>
          {form.isSubmitting ? "Criando..." : "Criar Treino"}
        </Button>
      </Form>
    </DefaultLayout>
  );
}
