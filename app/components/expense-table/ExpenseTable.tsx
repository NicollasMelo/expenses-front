import { FaEdit, FaTrash } from "react-icons/fa";
import ExpenseTableProps from "@/app/types/ExpenseTableProps";

export default function ExpenseTable({
  expenses,
  onEdit,
  onDelete,
}: ExpenseTableProps) {
  return (
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
          {expenses.map((expense) => (
            <tr key={expense.id} className="hover:bg-gray-800 transition">
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
                  onClick={() => onEdit(expense)}
                  className="hover:text-green-500 transition cursor-pointer"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(expense)}
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
  );
}
