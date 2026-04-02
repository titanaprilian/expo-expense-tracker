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
}

export const useExpenseStore = create<ExpenseState>((set) => ({
  expenses: [],
}));
