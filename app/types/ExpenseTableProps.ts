import { Expense } from "./expense";
interface ExpenseTableProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
}
export default ExpenseTableProps;
