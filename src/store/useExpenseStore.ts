import { create } from 'zustand';

export interface Expense {
  id: string;
  amount: number;
  category: string;
  note: string;
  date: string;
}

interface ExpenseState {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
}

export const useExpenseStore = create<ExpenseState>((set) => ({
  expenses: [],
  addExpense: (expense) =>
    set((state) => ({ expenses: [...state.expenses, expense] })),
}));
