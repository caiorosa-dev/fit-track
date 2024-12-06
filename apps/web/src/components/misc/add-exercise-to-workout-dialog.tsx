import { useApi } from '@/hooks/lib/use-api';
import { useZodForm } from '@/hooks/lib/use-zod-form';
import { z } from 'zod';
import { Form, FormItem, FormLabel, FormControl, FormMessage, FormField } from '@/components/ui/form';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Workout } from '@/types/Workout';
import { Exercise } from '@/types/Exercise';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { PropsWithChildren, useRef } from 'react';

const addExerciseSchema = z.object({
  workoutId: z.string().min(1, "Selecione um treino"),
});

export function AddExerciseToWorkoutDialog({ exercise, workouts, children }: PropsWithChildren<{ exercise: Exercise, workouts: Workout[] }>) {
  const api = useApi();
  const ref = useRef<HTMLButtonElement>(null);

  const form = useZodForm({
    schema: addExerciseSchema,
    defaultValues: {
      workoutId: '',
    },
    handler: async (data) => {
      await api.post(`/workout-exercise`, { exerciseId: exercise.id, workoutId: Number(data.workoutId), order: 0 });
    },
    onSubmitError: (error) => {
      console.error(error);

      toast.error("Erro ao adicionar exercício ao treino");
      ref.current?.click();
    },
    onSubmitSuccess: () => {
      toast.success("Exercício adicionado ao treino com sucesso");
      ref.current?.click();
    }
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar <span className='text-primary'>{exercise.name}</span> a um treino</DialogTitle>
          <DialogDescription>
            Selecione um treino para adicionar o exercício.
          </DialogDescription>
        </DialogHeader>

        <Form {...form} className="space-y-6">
          <FormField name="workoutId" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Selecione um treino</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um treino" />
                  </SelectTrigger>
                  <SelectContent>
                    {workouts.map((workout) => (
                      <SelectItem key={workout.id} value={workout.id.toString()}>
                        {workout.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant='secondary' ref={ref}>Cancelar</Button>
            </DialogClose>
            <Button disabled={form.isSubmitting || !form.formState.isValid} variant='default' type="submit">{form.isSubmitting ? "Adicionando..." : "Adicionar"}</Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog >
  );
}

