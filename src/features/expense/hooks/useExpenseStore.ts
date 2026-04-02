import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Expense } from '../types';

const EXPENSE_STORAGE_KEY = 'expenses';
const THEME_STORAGE_KEY = 'themePreference';

export type ThemePreference = 'light' | 'dark' | 'system';

interface ExpenseState {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  hydrated: boolean;
  hydrate: () => Promise<void>;
  themePreference: ThemePreference;
  setThemePreference: (preference: ThemePreference) => void;
}

export const useExpenseStore = create<ExpenseState>((set, get) => ({
  expenses: [],
  hydrated: false,
  themePreference: 'system', // Default preference
  hydrate: async () => {
    const expenseData = await AsyncStorage.getItem(EXPENSE_STORAGE_KEY);
    const themeData = await AsyncStorage.getItem(THEME_STORAGE_KEY);

    if (expenseData) {
      const expenses = JSON.parse(expenseData) as Expense[];
      set({ expenses });
    }
    if (themeData) {
      const themePreference = themeData as ThemePreference;
      set({ themePreference });
    }
    set({ hydrated: true });
  },
  addExpense: (expense) => {
    set((state) => {
      const newExpenses = [...state.expenses, expense];
      AsyncStorage.setItem(EXPENSE_STORAGE_KEY, JSON.stringify(newExpenses));
      return { expenses: newExpenses };
    });
  },
  setThemePreference: (preference) => {
    set({ themePreference: preference });
    AsyncStorage.setItem(THEME_STORAGE_KEY, preference);
  },
}));
