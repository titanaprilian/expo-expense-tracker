import { create } from 'zustand';
import type { Expense } from '../types';

interface ExpenseState {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
}

export const useExpenseStore = create<ExpenseState>((set) => ({
  expenses: [],
  addExpense: (expense) =>
    set((state) => ({ expenses: [...state.expenses, expense] })),
}));