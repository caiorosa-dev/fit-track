import { FullScreenPage } from "@/components/full-screen-page";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useZodForm } from "@/hooks/lib/use-zod-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/store/use-auth";
import { z } from "zod";
import { toast } from "sonner";
import { usePublicRoute } from "@/hooks/auth/use-public-route";

export const Route = createFileRoute("/login/")({
  component: () => <LoginPage />,
});

const loginSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um email válido." }),
  password: z.string().min(3, { message: "A senha deve ter pelo menos 3 caracteres." }),
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const form = useZodForm({
    schema: loginSchema,
    handler: async (values) => {
      await login(values);
    },
    onSubmitSuccess: () => {
      toast.success("Login realizado com sucesso. Redirecionando...");

      navigate({ to: "/" });
    },
    onSubmitError: () => {
      toast.error("Usuário ou senha inválidos.");

      form.setValue("password", "");
      form.setError("password", { message: "Tente outra senha." });
    },
  });

  usePublicRoute();

  return (
    <FullScreenPage className="flex justify-center items-center bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-zinc-400 via-teal-700 to-stone-400 dark:from-zinc-800 dark:via-teal-900 dark:to-stone-800">
      <Form {...form}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Insira seu email e senha para acessar o sistema.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="exemplo@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Digite sua senha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button disabled={form.isSubmitting || !form.formState.isValid} type="submit" className="w-full">
              <ButtonIcon isLoading={form.isSubmitting} />
              Entrar na sua conta
            </Button>
          </CardFooter>
        </Card>
        <div className="h-4" />
        <Button disabled={form.isSubmitting} type="submit" className="w-full">
          Não tem conta ainda? Crie uma agora!
        </Button>
      </Form>
    </FullScreenPage>
  );
}
