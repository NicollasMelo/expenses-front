import { useState, useEffect } from "react";
import ExpenseModalProps from "@/app/types/ExpenseModalProps";

export default function ExpenseModal({
  isOpen,
  onClose,
  onSave,
  expense,
}: ExpenseModalProps) {
  const [description, setDescription] = useState(expense?.description || "");
  const [category, setCategory] = useState(expense?.category || "");
  const [amount, setAmount] = useState(expense ? String(expense.amount) : "");
  const [date, setDate] = useState(
    expense?.date || new Date().toISOString().substring(0, 10)
  );

  useEffect(() => {
    setDescription(expense?.description || "");
    setCategory(expense?.category || "");
    setAmount(expense ? String(expense.amount) : "");
    setDate(expense?.date || "");
  }, [expense]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "Enter") handleSave();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, description, category, amount, date]);

  const handleSave = () => {
    const amountNumber = Number(amount.replace(",", "."));
    if (!description || !category || amountNumber <= 0) {
      alert("Preencha todos os campos corretamente!");
      return;
    }
    if (!date || date.trim() === "") {
      alert("Preencha a data!");
      return;
    }

    onSave({
      description,
      category,
      amount: amountNumber,
      date: date.trim(),
    });
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="cursor-pointer bg-[#1e1e1e] p-6 rounded-xl shadow-md border border-gray-700 w-full max-w-md flex flex-col gap-4">
        <h2 className="text-xl font-bold text-[#e5e7eb]">
          {expense ? "Editar Gasto" : "Nova Despesa"}
        </h2>
        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="px-4 py-2 rounded-lg bg-[#121212] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />
        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="px-4 py-2 rounded-lg bg-[#121212] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />
        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 rounded-lg bg-[#121212] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="px-4 py-2 rounded-lg bg-[#121212] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-2 bg-gray-600 rounded-lg text-white hover:bg-gray-500 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="cursor-pointer px-4 py-2 bg-green-600 rounded-lg text-white hover:bg-green-500 transition"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
