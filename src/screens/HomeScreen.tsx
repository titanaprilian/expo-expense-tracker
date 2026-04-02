import { Text, View, Button, FlatList } from 'react-native';
import { useExpenseStore } from '../features/expense/store/useExpenseStore';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const expenses = useExpenseStore((state) => state.expenses);

  return (
    <View style={{ padding: 16 }}>
      <Text>HomeScreen</Text>
      <Button title="Add Expense" onPress={() => navigation.navigate('AddExpense')} />
      
      {expenses.length === 0 ? (
        <Text style={{ marginTop: 16 }}>No expenses yet</Text>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ padding: 8, borderBottomWidth: 1 }}>
              <Text>{item.category} - ${item.amount}</Text>
              {item.note ? <Text>{item.note}</Text> : null}
              <Text style={{ fontSize: 12 }}>{new Date(item.date).toLocaleDateString()}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}