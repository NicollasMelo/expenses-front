import ExpensesDashboard from "../../components/expenses-dashboard/ExpensesDashboard";

export default function DashboardPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h1>
      <ExpensesDashboard />
    </main>
  );
}
