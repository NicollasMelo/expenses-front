import { Expense } from "../types/expense";
export async function deleteExpense(expense: Expense): Promise<void> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User not authenticated");

  if (!expense.id) throw new Error("Expense ID is required");

  const response = await fetch(`http://localhost:8080/expense/${expense.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Erro no backend", text);
    throw new Error("Falha ao deletar despesa");
  }
}
