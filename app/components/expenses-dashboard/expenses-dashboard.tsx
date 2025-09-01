"use client";

import { useEffect, useState } from "react";
import { Expense, getExpenses } from "../../services/get-expense";
import { updateExpense } from "../../services/update-expense";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { FaEdit, FaTrash } from "react-icons/fa";
import { deleteExpense } from "@/app/services/delete-expense";

export default function ExpensesDashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [editDescription, setEditDescription] = useState("");
  const [editAmount, setEditAmount] = useState(0);
  const [editCategory, setEditCategory] = useState("");

  useEffect(() => {
    async function loadExpenses() {
      try {
        const data = await getExpenses();
        setExpenses(data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      } finally {
        setLoading(false);
      }
    }
    loadExpenses();
  }, []);

  const totalAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const categories = Object.values(
    expenses.reduce((categoryTotals, expense) => {
      if (!categoryTotals[expense.category])
        categoryTotals[expense.category] = { name: expense.category, value: 0 };
      categoryTotals[expense.category].value += expense.amount;
      return categoryTotals;
    }, {} as Record<string, { name: string; value: number }>)
  );

  const expensesOverTime = Object.values(
    expenses.reduce((monthlyTotals, expense) => {
      const monthLabel = new Date(expense.date).toLocaleDateString("en", {
        month: "short",
      });
      if (!monthlyTotals[monthLabel])
        monthlyTotals[monthLabel] = { date: monthLabel, value: 0 };
      monthlyTotals[monthLabel].value += expense.amount;
      return monthlyTotals;
    }, {} as Record<string, { date: string; value: number }>)
  );

  const colors = ["#22c55e", "#3b82f6", "#f97316", "#a855f7", "#ef4444"];

  if (loading) {
    return <p className="text-gray-400 text-center mt-10">Carregando...</p>;
  }

  const handleEditClick = (expense: Expense) => {
    setSelectedExpense(expense);
    setEditDescription(expense.description);
    setEditAmount(expense.amount);
    setEditCategory(expense.category);
    setEditModalOpen(true);
  };

  const handleEditSave = async () => {
    if (!selectedExpense) return;

    try {
      const updated = await updateExpense({
        ...selectedExpense,
        description: editDescription,
        amount: editAmount,
        category: editCategory,
      });

      setExpenses((prev) =>
        prev.map((expense) => (expense.id === updated.id ? updated : expense))
      );
      setEditModalOpen(false);
      setSelectedExpense(null);
    } catch (error) {
      console.error("Erro ao atualizar gasto:", error);
    }
  };
  const handleDeleteClick = (expense: Expense) => {
    setSelectedExpense(expense);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedExpense) return;

    try {
      await deleteExpense(selectedExpense);

      setExpenses((prev) =>
        prev.filter((expense) => expense.id !== selectedExpense.id)
      );
      setDeleteModalOpen(false);
      setSelectedExpense(null);
    } catch (error) {
      console.error("Erro ao deletar gasto:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-[#1e1e1e] rounded-xl shadow-md p-6 border border-gray-700 text-center">
        <h2 className="text-xl font-bold text-[#e5e7eb]">
          Valor total de gastos
        </h2>
        <p className="text-4xl font-extrabold text-green-500 mt-2">
          R$: {totalAmount.toFixed(2)}
        </p>
      </div>

      <div className="bg-[#1e1e1e] rounded-xl shadow-md p-6 border border-gray-700 overflow-x-auto">
        <h2 className="text-lg font-semibold text-[#e5e7eb] mb-4">
          Gastos Recentes
        </h2>
        <table className="min-w-full text-left text-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-600">Descrição</th>
              <th className="py-2 px-4 border-b border-gray-600">Categoria</th>
              <th className="py-2 px-4 border-b border-gray-600">Valor</th>
              <th className="py-2 px-4 border-b border-gray-600">Data</th>
              <th className="py-2 px-4 border-b border-gray-600">Ações</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, i) => (
              <tr key={i} className="hover:bg-gray-800 transition">
                <td className="py-2 px-4">{expense.description}</td>
                <td className="py-2 px-4">{expense.category}</td>
                <td className="py-2 px-4 text-green-500">
                  R$: {expense.amount.toFixed(2)}
                </td>
                <td className="py-2 px-4">
                  {new Date(expense.date).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 flex gap-2">
                  <button
                    onClick={() => handleEditClick(expense)}
                    className="hover:text-blue-400 transition cursor-pointer"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(expense)}
                    className="hover:text-red-500 transition cursor-pointer"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editModalOpen && selectedExpense && (
        <form
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onSubmit={handleEditSave}
        >
          <div className="bg-[#1e1e1e] p-6 rounded-xl shadow-md border border-gray-700 w-full max-w-md flex flex-col gap-4">
            <h2 className="text-xl font-bold text-[#e5e7eb]">Editar gasto</h2>
            <input
              type="text"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Descrição"
              className="px-4 py-2 rounded-lg bg-[#121212] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
            <input
              type="number"
              value={editAmount}
              onChange={(e) => setEditAmount(Number(e.target.value))}
              placeholder="Valor"
              className="px-4 py-2 rounded-lg bg-[#121212] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
            <input
              type="text"
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              placeholder="Categoria"
              className="px-4 py-2 rounded-lg bg-[#121212] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditModalOpen(false)}
                className="px-4 py-2 bg-gray-600 rounded-lg text-white hover:bg-gray-500 transition"
              >
                Cancelar
              </button>
              <button className="px-4 py-2 bg-green-600 rounded-lg text-white hover:bg-green-500 transition">
                Salvar
              </button>
            </div>
          </div>
        </form>
      )}

      {deleteModalOpen && selectedExpense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1e1e1e] p-6 rounded-xl shadow-md border border-gray-700 w-full max-w-sm flex flex-col gap-4">
            <h2 className="text-xl font-bold text-[#e5e7eb]">
              Confirmar exclusão
            </h2>
            <p className="text-gray-400">
              Tem certeza de que deseja excluir "{selectedExpense.description}"?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-600 rounded-lg text-white hover:bg-gray-500 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-500 transition"
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#1e1e1e] rounded-xl shadow-md p-4 border border-gray-700">
          <h2 className="text-lg font-semibold text-[#e5e7eb] mb-2">
            Despesas por Categoria
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  className="cursor-pointer"
                  data={categories}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                >
                  {categories.map((_, i) => (
                    <Cell key={i} fill={colors[i % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#1e1e1e] rounded-xl shadow-md p-4 border border-gray-700">
          <h2 className="text-lg font-semibold text-[#e5e7eb] mb-2">
            Evolução dos Gastos
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={expensesOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke="#e5e7eb" />
                <YAxis stroke="#e5e7eb" />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="value"
                  fill="#3b82f6"
                  radius={[6, 6, 0, 0]}
                  className="cursor-pointer"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
