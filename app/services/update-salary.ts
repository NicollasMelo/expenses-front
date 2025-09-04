export async function updateSalary(userId: number, newSalary: number) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User not authenticated");

  const response = await fetch(`http://localhost:8080/users/${userId}/salary`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ salary: newSalary }),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Erro no backend", text);
    throw new Error("Falha ao atualizar salário");
  }

  return response.json();
}
