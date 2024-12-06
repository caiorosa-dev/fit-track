import { createFileRoute } from "@tanstack/react-router";
import { useApi } from "@/hooks/lib/use-api";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { DefaultLayout } from '@/components/layout/default-layout';
import { Form, FormItem, FormLabel, FormControl, FormMessage, FormField } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import * as z from 'zod';
import { useZodForm } from '@/hooks/lib/use-zod-form';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useMe } from '@/hooks/api/use-me';

const updateUserSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export const Route = createFileRoute("/app/profile/")({
  component: ProfilePage,
});

function ProfilePage() {
  const api = useApi();
  const { user, isLoading } = useMe();
  const queryClient = useQueryClient();

  const form = useZodForm({
    schema: updateUserSchema,
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    handler: async (data) => {
      await api.put("/users", data);
    },
    onSubmitError: (error) => {
      console.error(error);
      toast.error("Erro ao atualizar o perfil");
    },
    onSubmitSuccess: () => {
      toast.success("Perfil atualizado com sucesso");
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    }
  });

  useEffect(() => {
    if (user) {
      form.setValue('name', user.name);
      form.setValue('email', user.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <DefaultLayout>
      <Header>
        <h1>Perfil</h1>
      </Header>
      <Form {...form} className="mt-8 space-y-6">
        <FormField name="name" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Nome</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Seu nome" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField name="email" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Seu email" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField name="password" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Senha</FormLabel>
            <FormControl>
              <Input type="password" {...field} placeholder="Sua senha" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <Button type="submit" className="w-full" disabled={form.isSubmitting || !form.formState.isValid}>
          {form.isSubmitting ? "Salvando..." : "Salvar"}
        </Button>
      </Form>
    </DefaultLayout>
  );
}
