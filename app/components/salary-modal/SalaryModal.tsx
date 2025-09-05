import { useEffect, useState } from "react";

interface SalaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newSalary: number) => void;
  currentSalary: number;
}

export default function SalaryModal({
  isOpen,
  onClose,
  onSave,
  currentSalary,
}: SalaryModalProps) {
  const [salary, setSalary] = useState(currentSalary);

  useEffect(() => {
    setSalary(currentSalary);
  }, [currentSalary]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "Enter") {
        onSave(salary);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, salary, onClose, onSave]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#1e1e1e] p-6 rounded-xl w-80 border border-gray-700">
        <h2 className="text-xl font-bold text-[#e5e7eb] mb-4">
          Editar Salário
        </h2>
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(parseFloat(e.target.value))}
          className="w-full p-2 rounded border border-gray-600 bg-[#2a2a2a] text-[#e5e7eb]"
        />
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="cursor-pointer px-4 py-2 rounded bg-gray-700 text-[#e5e7eb] hover:bg-gray-600"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="cursor-pointer px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => onSave(salary)}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
