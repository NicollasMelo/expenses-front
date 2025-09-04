"use client";
import { register } from "@/app/services/create-user";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const data = await register(email, fullName, password);
      console.log("Usuário criado:", data);
      setSuccess(true);
      setEmail("");
      setFullName("");
      setPassword("");
      router.push("/pages/dashboard");
    } catch (err) {
      setError(
        "Não foi possível criar o usuário. Verifique os dados e tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#121212]">
      <div className="bg-[#1e1e1e] shadow-md rounded-xl p-10 w-full max-w-md flex flex-col gap-6 border border-gray-700">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-20 h-20" />
          <h2 className="text-3xl font-bold text-[#e5e7eb]">Criar Conta</h2>
          <p className="text-gray-400 text-sm">
            Comece a controlar seus gastos 🚀
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="border border-gray-600 rounded-lg px-4 py-2 bg-[#121212] text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-600 rounded-lg px-4 py-2 bg-[#121212] text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-600 rounded-lg px-4 py-2 bg-[#121212] text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            required
          />

          <div className="flex items-center justify-between text-sm">
            <a
              href="/forgot-password"
              className="text-green-500 hover:underline"
            >
              Esqueci minha senha
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`bg-green-600 text-white rounded-lg px-4 py-2 font-semibold transition cursor-pointer ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-500"
            }`}
          >
            {loading ? "Criando..." : "Cadastrar"}
          </button>
        </form>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {success && (
          <p className="text-green-500 text-sm text-center">
            Usuário criado com sucesso!
          </p>
        )}

        <div className="text-center text-sm text-gray-400">
          Já possui conta?{" "}
          <a
            href="/"
            className="text-green-500 hover:underline font-medium cursor-pointer"
          >
            Entrar
          </a>
        </div>
      </div>
    </main>
  );
}
