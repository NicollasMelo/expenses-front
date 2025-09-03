export async function Salary(
  userId: number,
  newSalary: number,
  setSalary: unknown
) {
  try {
    const response = await fetch(`http://localhost:8080/expense/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ salary: newSalary }),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar salário");
    }

    const data = await response.json();
    console.log("Salário atualizado:", data);
    return data.salary;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
