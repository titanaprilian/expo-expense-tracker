import { useState } from 'react';
import { Text, View, TextInput, Button, Alert } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useExpenseStore, type Expense } from '../store/useExpenseStore';

type AddExpenseScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AddExpense'>;
};

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Other'];

export default function AddExpenseScreen({ navigation }: AddExpenseScreenProps) {
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

  return (
    <View style={{ padding: 16 }}>
      <Text>Amount</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 8, marginBottom: 16 }}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholder="Enter amount"
      />

      <Text>Category</Text>
      <View style={{ marginBottom: 16 }}>
        {CATEGORIES.map((cat) => (
          <Button
            key={cat}
            title={cat}
            onPress={() => setCategory(cat)}
            color={category === cat ? 'blue' : 'gray'}
          />
        ))}
      </View>

      <Text>Note (optional)</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 8, marginBottom: 16 }}
        value={note}
        onChangeText={setNote}
        placeholder="Enter note"
      />

      <Button title="Save" onPress={handleSave} />
    </View>
  );
}