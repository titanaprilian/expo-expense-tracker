import { Text, View, TextInput, Button } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useAddExpense, CATEGORIES } from '../features/expense/hooks/useAddExpense';

type AddExpenseScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AddExpense'>;
};

export default function AddExpenseScreen({ navigation }: AddExpenseScreenProps) {
  const { amount, setAmount, category, setCategory, note, setNote, handleSave } = useAddExpense(navigation);

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