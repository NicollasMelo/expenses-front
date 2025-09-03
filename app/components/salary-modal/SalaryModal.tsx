import { useState } from "react";

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
  const [value, setValue] = useState<number>(currentSalary);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSave(value);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1e1e1e] rounded-xl shadow-md p-6 border border-gray-700 w-80">
        <h2 className="text-xl font-bold text-[#e5e7eb] mb-4">
          Adicionar/Atualizar Salário
        </h2>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full p-2 rounded-md text-black"
        />
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-500 text-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md bg-blue-500 text-white"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
