import { useState } from "react";
import SalaryModal from "../salary-modal/SalaryModal";

interface ExpenseSummaryProps {
  totalAmount: number;
  salary: number;
  onUpdateSalary: (newSalary: number) => void; // callback do pai
}

export default function ExpenseSummary({
  totalAmount,
  salary,
  onUpdateSalary,
}: ExpenseSummaryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSalary, setCurrentSalary] = useState(salary);

  const remaining = currentSalary - totalAmount;

  const handleSave = (newSalary: number) => {
    setCurrentSalary(newSalary); // atualiza o estado local do front
    onUpdateSalary(newSalary); // chama o pai para atualizar no backend
    setIsModalOpen(false); // fecha modal
  };

  return (
    <div className="space-y-4">
      <div
        className="bg-[#1e1e1e] rounded-xl shadow-md p-6 border border-gray-700 text-center cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <h2 className="text-xl font-bold text-[#e5e7eb] mb-4">
          Resumo Financeiro
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-lg text-gray-400">Salário</p>
            <p className="text-2xl font-extrabold text-blue-400 mt-1">
              R$: {currentSalary.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-lg text-gray-400">Gastos Totais</p>
            <p className="text-2xl font-extrabold text-red-400 mt-1">
              R$: {totalAmount.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#1e1e1e] rounded-xl shadow-md p-6 border border-gray-700 text-center">
        <h2 className="text-lg text-gray-400">Saldo Restante</h2>
        <p
          className={`text-3xl font-extrabold mt-2 ${
            remaining >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          R$: {remaining.toFixed(2)}
        </p>
      </div>

      <SalaryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave} // aqui chamamos handleSave
        currentSalary={currentSalary}
      />
    </div>
  );
}
