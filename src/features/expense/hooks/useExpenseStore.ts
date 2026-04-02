import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Expense } from '../types';

const STORAGE_KEY = 'expenses';

interface ExpenseState {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  hydrated: boolean;
  hydrate: () => Promise<void>;
}

export const useExpenseStore = create<ExpenseState>((set, get) => ({
  expenses: [],
  hydrated: false,
  hydrate: async () => {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (data) {
      const expenses = JSON.parse(data) as Expense[];
      set({ expenses, hydrated: true });
    } else {
      set({ hydrated: true });
    }
  },
  addExpense: (expense) => {
    set((state) => {
      const newExpenses = [...state.expenses, expense];
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newExpenses));
      return { expenses: newExpenses };
    });
  },
}));
