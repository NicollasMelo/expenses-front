import { Expense } from "./expense";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  expense: Expense;
}
export type { DeleteModalProps };
