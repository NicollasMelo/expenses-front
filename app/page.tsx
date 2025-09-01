"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "./services/auth";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      router.push("/pages/dashboard");
    } catch (err) {
      setError("Email ou senha inválidos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#121212]">
      <div className="bg-[#1e1e1e] rounded-xl shadow-md p-10 w-full max-w-md flex flex-col gap-6 border border-gray-700">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-20 h-20" />
          <h2 className="text-3xl font-bold text-[#e5e7eb]">Login</h2>
          <p className="text-gray-400 text-sm">
            Controle seus gastos com facilidade 🚀
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-500 text-white rounded-lg px-4 py-2 font-semibold transition cursor-pointer disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-400">
          Não possui conta?{" "}
          <a
            href="/pages/register"
            className="text-green-500 hover:underline font-medium cursor-pointer"
          >
            Cadastre-se
          </a>
        </div>
      </div>
    </main>
  );
}
