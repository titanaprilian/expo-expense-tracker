import { useExpenseStore } from '../store/useExpenseStore';

export function useTotalSpending() {
  const expenses = useExpenseStore((state) => state.expenses);
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}
