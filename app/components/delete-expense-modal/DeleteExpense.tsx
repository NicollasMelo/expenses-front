import { DeleteModalProps } from "@/app/types/DeleteModalProps";

export function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  expense,
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1e1e1e] p-6 rounded-xl shadow-md border border-gray-700 w-full max-w-md flex flex-col gap-4">
        <h2 className="text-xl font-bold text-[#e5e7eb]">Confirmar exclusão</h2>
        <p className="text-gray-400">
          Tem certeza que deseja excluir "{expense.description}"?
        </p>
        <div className="flex justify-end gap-2 ">
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-2 bg-gray-600 rounded-lg text-white hover:bg-gray-500 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className=" cursor-pointer px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-500 transition"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
