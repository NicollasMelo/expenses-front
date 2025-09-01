export interface Expense {
  id: number | null | undefined;
  description: string;
  amount: number;
  date: string;
  category: string;
}
export async function createExpense(expense: Expense): Promise<Expense> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User not authenticated");

  if (!expense.id) throw new Error("Expense ID is required");

  const response = await fetch("http://localhost:8080/expense", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      description: expense.description,
      amount: expense.amount,
      date: expense.date,
      category: expense.category,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Backend error:", text);
    throw new Error("Failed to create expense");
  }

  return response.json();
}
