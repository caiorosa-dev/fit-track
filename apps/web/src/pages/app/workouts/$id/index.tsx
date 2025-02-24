import { createFileRoute, useParams, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useApi } from '@/hooks/lib/use-api';
import { DefaultLayout } from '@/components/layout/default-layout';
import { Header } from '@/components/layout/header';
import { Form, FormItem, FormLabel, FormControl, FormMessage, FormField } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TabSelector } from '@/components/ui/tabs-selector';
import { toast } from 'sonner';
import * as z from 'zod';
import { useZodForm } from '@/hooks/lib/use-zod-form';
import { useWorkout } from '@/hooks/api/use-workout';
import { useQueryClient } from '@tanstack/react-query';
import { WEEKDAYS_OPTIONS } from '@/lib/week-days';

const updateWorkoutSchema = z.object({
  name: z.string().min(1, "O nome do treino é obrigatório"),
  weekday: z.number().min(0, "O dia da semana é obrigatório"),
});

export const Route = createFileRoute('/app/workouts/$id/')({
  component: WorkoutDetailsPage,
});

function WorkoutDetailsPage() {
  const { id } = useParams({ from: '/app/workouts/$id/' });
  const { workout, isLoading } = useWorkout(id);

  const api = useApi();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useZodForm({
    schema: updateWorkoutSchema,
    defaultValues: {
      name: '',
      weekday: 0,
    },
    handler: async (data) => {
      await api.put(`/workouts/${id}`, data);
    },
    onSubmitError: (error) => {
      console.error(error);
      toast.error("Erro ao atualizar o treino");
    },
    onSubmitSuccess: () => {
      toast.success("Treino atualizado com sucesso");
      queryClient.invalidateQueries({ queryKey: ['workouts'] });

      navigate({ to: "/app/workouts" });
    }
  });

  useEffect(() => {
    if (workout && !isLoading) {
      form.setValue('name', workout.name);
      form.setValue('weekday', workout.weekday);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <DefaultLayout isLoading={isLoading}>
      <Header backUrl='/app/workouts'>
        <h1>Atualizar treino</h1>
      </Header>
      <Form {...form} className="grid gap-4 self-center">
        <FormField name="name" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Nome do Treino</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Costas do Cbum" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField name="weekday" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Dia da semana</FormLabel>
            <FormControl>
              <TabSelector value={field.value} onChange={field.onChange} options={WEEKDAYS_OPTIONS} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <Button type="submit" className="w-full" disabled={form.isSubmitting || !form.formState.isValid}>
          {form.isSubmitting ? "Atualizando..." : "Atualizar Treino"}
        </Button>
      </Form>
    </DefaultLayout>
  );
}
