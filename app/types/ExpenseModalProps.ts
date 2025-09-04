import { Expense } from "./expense";

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (expense: {
    description: string;
    category: string;
    amount: number;
    date: string;
  }) => void;
  expense?: Expense;
}
export default ExpenseModalProps;
