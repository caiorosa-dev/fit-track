import { useApi } from "@/hooks/lib/use-api";
import { useZodForm } from "@/hooks/lib/use-zod-form";
import { z } from "zod";
import { Form, FormItem, FormLabel, FormControl, FormMessage, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button, ButtonIcon } from "@/components/ui/button";
import { toast } from "sonner";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { PropsWithChildren, useRef } from "react";
import { Exercise } from "@/types/Exercise";
import { useQueryClient } from "@tanstack/react-query";

const addExerciseLogSchema = z.object({
  sets: z
    .string()
    .min(0, "Informe o número de séries")
    .refine((value) => !isNaN(Number(value)), "Informe um número válido"),
  repetitions: z
    .string()
    .min(0, "Informe o número de repetições")
    .refine((value) => !isNaN(Number(value)), "Informe um número válido"),
  weight: z
    .string()
    .min(0, "Informe o peso")
    .refine((value) => !isNaN(Number(value)), "Informe um peso válido"),
});

export function AddExerciseLogDialog({ sessionId, exercise, children }: PropsWithChildren<{ sessionId: string; exercise: Exercise }>) {
  const api = useApi();
  const ref = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();

  const form = useZodForm({
    schema: addExerciseLogSchema,
    defaultValues: {
      sets: "0",
      repetitions: "0",
      weight: "0.0",
    },
    handler: async (data) => {
      await api.post(`/exercise-logs`, {
        workoutSessionId: Number(sessionId),
        exerciseId: exercise.id,
        sets: Number(data.sets),
        repetitions: Number(data.repetitions),
        weight: Number(data.weight),
      });
      queryClient.invalidateQueries({ queryKey: ["workout-sessions", sessionId] });
    },
    onSubmitError: (error) => {
      console.error(error);

      toast.error("Erro ao adicionar cadastro de atividade");
      ref.current?.click();
    },
    onSubmitSuccess: () => {
      toast.success("Cadastro da atividade adicionado com sucesso");
      ref.current?.click();
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Cadastrar <span className="text-primary">{exercise.name}</span>
          </DialogTitle>
          <DialogDescription>Preencha os detalhes da atividade abaixo.</DialogDescription>
        </DialogHeader>

        <Form {...form} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              name="sets"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Séries</FormLabel>
                  <FormControl>
                    <Input type="number" value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="repetitions"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repetições</FormLabel>
                  <FormControl>
                    <Input type="number" value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            name="weight"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Peso</FormLabel>
                <FormControl>
                  <Input type="number" value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary" ref={ref}>
                Cancelar
              </Button>
            </DialogClose>
            <Button disabled={form.isSubmitting || !form.formState.isValid} variant="default" type="submit">
              <ButtonIcon isLoading={form.isSubmitting} />
              {form.isSubmitting ? "Adicionando..." : "Adicionar"}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
