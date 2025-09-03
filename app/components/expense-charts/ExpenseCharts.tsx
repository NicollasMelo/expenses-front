import { Expense } from "../../types/expense";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

interface ExpenseChartsProps {
  expenses: Expense[];
}

export default function ExpenseCharts({ expenses }: ExpenseChartsProps) {
  const categories = Object.values(
    expenses.reduce((acc, expense) => {
      if (!acc[expense.category])
        acc[expense.category] = { name: expense.category, value: 0 };
      acc[expense.category].value += expense.amount;
      return acc;
    }, {} as Record<string, { name: string; value: number }>)
  );

  const expensesOverTime = Object.values(
    expenses.reduce((acc, expense) => {
      const month = new Date(expense.date).toLocaleDateString("en", {
        month: "short",
      });
      if (!acc[month]) acc[month] = { date: month, value: 0 };
      acc[month].value += expense.amount;
      return acc;
    }, {} as Record<string, { date: string; value: number }>)
  );

  const colors = [
    "#156b34ff",
    "#a3a116ff",
    "#4a79deff",
    "#15803d",
    "#f3a7cdff",
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6 ">
      <div className="bg-[#1e1e1e] rounded-xl shadow-md p-4 border border-gray-700 flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-[#e5e7eb] mb-2">
          Despesas por Categoria
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                className="cursor-pointer"
                data={categories}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {categories.map((_, i) => (
                  <Cell key={i} fill={colors[i % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap gap-3 mt-4">
          {categories.map((cat, i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className="w-4 h-4 rounded-sm"
                style={{ backgroundColor: colors[i % colors.length] }}
              ></span>
              <span className="text-gray-300 text-sm">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#1e1e1e] rounded-xl shadow-md p-4 border border-gray-700">
        <h2 className="text-lg font-semibold text-[#e5e7eb] mb-2">
          Evolução dos Gastos
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={expensesOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" stroke="#e5e7eb" />
              <YAxis stroke="#e5e7eb" />
              <Tooltip />
              <Legend />
              <Bar
                className="cursor-pointer"
                dataKey="value"
                fill="#22c55e"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
