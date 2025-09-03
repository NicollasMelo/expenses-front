"use client";

import { useEffect, useState } from "react";
import { Expense } from "@/app/types/expense";
import { createExpense } from "@/app/services/create-expense";
import { deleteExpense } from "@/app/services/delete-expense";
import { getExpenses } from "@/app/services/get-expense";
import { updateExpense } from "@/app/services/update-expense";

import ExpenseSummary from "../expense-summary/ExpenseSummary";
import ExpenseTable from "../expense-table/ExpenseTable";
import ExpenseModal from "../expense-modal/ExpenseModal";
import ExpenseCharts from "../expense-charts/ExpenseCharts";
import { DeleteModal } from "../delete-expense-modal/DeleteExpense";

import { useUser } from "../../hooks/useUser";
import { Salary } from "../../services/salary";

export default function DashboardPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [salary, setSalary] = useState(0);

  const user = useUser();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  useEffect(() => {
    async function loadExpenses() {
      if (!user) return;
      try {
        const data = await getExpenses();
        setExpenses(data);
        setSalary(user.salary || 0);
      } catch (error) {
        console.error("Erro ao buscar gastos:", error);
      } finally {
        setLoading(false);
      }
    }
    loadExpenses();
  }, [user]);

  const totalAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const handleEdit = (expense: Expense) => {
    setSelectedExpense(expense);
    setEditModalOpen(true);
  };

  const handleDelete = (expense: Expense) => {
    setSelectedExpense(expense);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedExpense) return;
    try {
      await deleteExpense(selectedExpense);
      setExpenses((prev) => prev.filter((e) => e.id !== selectedExpense.id));
      setDeleteModalOpen(false);
      setSelectedExpense(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateSave = async (data: {
    description: string;
    category: string;
    amount: number;
    date: string;
  }) => {
    try {
      const created = await createExpense(data);
      setExpenses((prev) => [created, ...prev]);
      setCreateModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditSave = async (data: {
    description: string;
    category: string;
    amount: number;
    date: string;
  }) => {
    if (!selectedExpense) return;
    try {
      const updated = await updateExpense({ ...selectedExpense, ...data });
      setExpenses((prev) =>
        prev.map((e) => (e.id === updated.id ? updated : e))
      );
      setEditModalOpen(false);
      setSelectedExpense(null);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading || !user)
    return <p className="text-gray-400 text-center mt-10">Carregando...</p>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <button
          onClick={() => setCreateModalOpen(true)}
          className="cursor-pointer px-6 py-3 bg-[#1e1e1e] text-green-500 border border-green-500 rounded-xl shadow-md hover:bg-green-500 hover:text-white transition font-semibold"
        >
          + Nova Despesa
        </button>
      </div>

      <ExpenseSummary
        totalAmount={totalAmount}
        salary={salary}
        onUpdateSalary={(newSalary) =>
          user && Salary(user.id, newSalary, setSalary)
        }
      />
      <ExpenseTable
        expenses={expenses}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ExpenseModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSave={handleCreateSave}
      />

      <ExpenseModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleEditSave}
        expense={selectedExpense || undefined}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        expense={selectedExpense!}
      />

      <ExpenseCharts expenses={expenses} />
    </div>
  );
}
