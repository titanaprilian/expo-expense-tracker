import { useState } from 'react';
import { Alert } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../navigation/AppNavigator';
import { useExpenseStore } from '../store/useExpenseStore';
import type { Expense } from '../types';

type AddExpenseScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AddExpense'>;
};

export const useAddExpense = (navigation: AddExpenseScreenProps['navigation']) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');
  const addExpense = useExpenseStore((state) => state.addExpense);

  const handleSave = () => {
    if (!amount || !category) {
      Alert.alert('Error', 'Please enter amount and category');
      return;
    }

    const expense: Expense = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      category,
      note: note || '',
      date: new Date().toISOString(),
    };

    addExpense(expense);
    navigation.goBack();
  };

  return {
    amount,
    setAmount,
    category,
    setCategory,
    note,
    setNote,
    handleSave,
  };
};

export const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Other'];