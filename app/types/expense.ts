import { UserData } from "./userData";

export interface Expense {
  id?: number | null;
  description: string;
  category: string;
  amount: number;
  date: string;
}
