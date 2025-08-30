import Image from "next/image";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-white to-purple-300">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-sm flex flex-col gap-6 border border-purple-200">
        <h2 className="text-3xl font-bold text-center text-purple-700">
          Cadastro
        </h2>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome"
            className="border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />
          <input
            type="password"
            placeholder="Senha"
            className="border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-purple-700 transition cursor-pointer"
          >
            Cadastrar
          </button>
        </form>
        <div className="text-center text-sm text-gray-500">
          Já possui conta?{" "}
          <a
            href="/"
            className="text-purple-600 hover:underline font-medium cursor-pointer"
          >
            Entrar
          </a>
        </div>
      </div>
    </div>
  );
}
