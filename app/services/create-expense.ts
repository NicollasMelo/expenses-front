import { Expense } from "../types/expense";

export async function createExpense(expense: Expense): Promise<Expense> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User not authenticated");

  const response = await fetch("http://localhost:8080/expense", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(expense),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Backend error:", text);
    throw new Error("Falha ao criar despesa");
  }
  const data: Expense = await response.json();
  return data;
}
