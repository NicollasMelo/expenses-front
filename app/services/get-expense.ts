import { Expense } from "../types/expense";

export async function getExpenses(): Promise<Expense[]> {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Usuário não autenticado");

    const res = await fetch("http://localhost:8080/expense", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Erro do backend:", text);
      throw new Error("Erro ao buscar despesas");
    }

    return res.json();
  } catch (err) {
    console.error("Erro ao chamar getExpenses:", err);
    throw err;
  }
}
