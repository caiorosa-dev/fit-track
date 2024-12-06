import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useApi } from "@/hooks/lib/use-api";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { DefaultLayout } from '@/components/layout/default-layout';

export const Route = createFileRoute("/app/profile/")({
  component: ProfilePage,
});

function ProfilePage() {
  const api = useApi();
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await api.post("/profile/update", { height, weight });
      setMessage("Informações atualizadas com sucesso!");
    } catch (error) {
      setMessage("Erro ao atualizar informações. Tente novamente.");
      console.error("Erro ao atualizar perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <Header>
        <h1 className="text-center text-2xl font-bold">Perfil</h1>
      </Header>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700 text-center">
            Altura (cm)
          </label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary text-center text-black"
            placeholder="Ex: 175"
            style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
            required
          />
        </div>

        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 text-center">
            Peso (kg)
          </label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary text-center text-black"
            placeholder="Ex: 70"
            style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
            required
          />
        </div>

        <div className="flex justify-center">
          <Button type="submit" disabled={loading} className="mt-4">
            {loading ? "Salvando..." : "Salvar"}
          </Button>
        </div>
        {message && <p className="mt-4 text-center text-sm text-gray-500">{message}</p>}
      </form>
    </DefaultLayout>
  );
}
