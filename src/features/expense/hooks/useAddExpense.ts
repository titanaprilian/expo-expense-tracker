import { useState } from 'react';
import { Alert } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../navigation/AppNavigator';
import { useExpenseStore } from '../hooks/useExpenseStore';
import type { Expense } from '../types';
import { formatRupiah, parseRupiah } from '../../../utils/currency';

type AddExpenseScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AddExpense'>;
};

export const useAddExpense = (navigation: AddExpenseScreenProps['navigation']) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');
  const addExpense = useExpenseStore((state) => state.addExpense);

  const handleAmountChange = (value: string) => {
    const numericValue = parseRupiah(value);
    if (numericValue > 0) {
      setAmount(formatRupiah(numericValue));
    } else {
      setAmount(value.replace(/[^0-9]/g, ''));
    }
  };

  const handleSave = () => {
    const numericAmount = parseRupiah(amount);
    
    if (!numericAmount || !category) {
      Alert.alert('Error', 'Please enter amount and category');
      return;
    }

    const expense: Expense = {
      id: Date.now().toString(),
      amount: numericAmount,
      category,
      note: note || '',
      date: new Date().toISOString(),
    };

    addExpense(expense);
    navigation.goBack();
  };

  return {
    amount,
    setAmount: handleAmountChange,
    category,
    setCategory,
    note,
    setNote,
    handleSave,
  };
};

export const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Other'];