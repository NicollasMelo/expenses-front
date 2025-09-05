import { Expense } from "@/app/types/expense";
import ExpenseChartsProps from "@/app/types/ExpenseChartsProps";
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
} from "recharts";

export default function ExpenseCharts({ expenses }: ExpenseChartsProps) {
  const monthNamesPt = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  const colors = [
    "#156b34ff",
    "#a3a116ff",
    "#4a79deff",
    "#15803d",
    "#f3a7cdff",
  ];

  const monthColorMap: Record<string, string> = {
    Jan: "#156b34",
    Fev: "#a3a116",
    Mar: "#4a79de",
    Abr: "#154780ff",
    Mai: "#f3a7cd",
    Jun: "#e11d48",
    Jul: "#f59e0b",
    Ago: "#7c3aed",
    Set: "#0ea5e9",
    Out: "#d946ef",
    Nov: "#facc15",
    Dez: "#10b981",
  };

  const groupByCategory = (expenses: Expense[]) => {
    const map = new Map<string, { name: string; value: number }>();
    expenses.forEach((expense) => {
      if (!map.has(expense.category)) {
        map.set(expense.category, { name: expense.category, value: 0 });
      }
      map.get(expense.category)!.value += expense.amount;
    });
    return Array.from(map.values());
  };

  const groupByMonth = (expenses: Expense[]) => {
    const map = new Map<string, { date: string; value: number }>();

    expenses.forEach((expense) => {
      const dateObj = new Date(expense.date);
      const monthPt = monthNamesPt[dateObj.getMonth()];
      const year = dateObj.getFullYear();
      const monthYear = `${monthPt} ${year}`;
      if (!map.has(monthYear)) {
        map.set(monthYear, { date: monthYear, value: 0 });
      }
      map.get(monthYear)!.value += expense.amount;
    });

    const result = Array.from(map.values());
    result.sort((a, b) => {
      const [monthA, yearA] = a.date.split(" ");
      const [monthB, yearB] = b.date.split(" ");
      if (yearA !== yearB) return parseInt(yearA) - parseInt(yearB);
      return monthNamesPt.indexOf(monthA) - monthNamesPt.indexOf(monthB);
    });

    return result;
  };

  const categories = groupByCategory(expenses);
  const expensesOverTime = groupByMonth(expenses);

  const renderMonthLegend = () => (
    <div className="flex flex-wrap gap-3 mt-2">
      {expensesOverTime.map((entry) => {
        const monthAbbr = entry.date.split(" ")[0];
        return (
          <div key={entry.date} className="flex items-center gap-1">
            <span
              className="w-4 h-4 rounded-sm"
              style={{ backgroundColor: monthColorMap[monthAbbr] }}
            ></span>
            <span className="text-gray-300 text-sm">{entry.date}</span>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="grid md:grid-cols-2 gap-6">
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
          Evolucao dos Gastos
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={expensesOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" stroke="#e5e7eb" />
              <YAxis stroke="#e5e7eb" />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload) return null;
                  return (
                    <div className="bg-transparent text-white p-0 m-0">
                      <span>
                        {label}: R$ {payload[0].value.toFixed(2)}
                      </span>
                    </div>
                  );
                }}
              />
              <Bar className="cursor-pointer bg-black" dataKey="value">
                {expensesOverTime.map((entry) => {
                  const monthAbbr = entry.date.split(" ")[0];
                  return (
                    <Cell key={entry.date} fill={monthColorMap[monthAbbr]} />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          {renderMonthLegend()}
        </div>
      </div>
    </div>
  );
}
