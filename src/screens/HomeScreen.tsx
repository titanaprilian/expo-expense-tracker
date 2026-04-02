import { Text, View, Button, FlatList } from 'react-native';
import { useExpenseStore } from '../features/expense/store/useExpenseStore';
import { useTotalSpending } from '../features/expense/hooks/useTotalSpending';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const expenses = useExpenseStore((state) => state.expenses);
  const totalSpending = useTotalSpending();

  return (
    <View className="p-4 flex-1 bg-gray-50">
      <View className="bg-white p-4 mb-4 rounded-lg shadow-sm border border-gray-100">
        <Text className="text-gray-500 text-sm">Total Spending</Text>
        <Text className="text-3xl font-bold text-gray-800 mt-1">${totalSpending.toFixed(2)}</Text>
      </View>
      
      <Text className="text-2xl font-bold text-gray-800 mb-4">Expenses</Text>
      
      <Button 
        title="Add Expense" 
        onPress={() => navigation.navigate('AddExpense')} 
      />
      
      {expenses.length === 0 ? (
        <Text className="text-center text-gray-500 mt-4">No expenses yet</Text>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="bg-white p-4 mb-2 rounded-lg shadow-sm border border-gray-100">
              <View className="flex-row justify-between items-center">
                <Text className="text-lg font-semibold text-gray-800">{item.category}</Text>
                <Text className="text-xl font-bold text-green-600">${item.amount.toFixed(2)}</Text>
              </View>
              {item.note ? (
                <Text className="text-gray-500 text-sm mt-1">{item.note}</Text>
              ) : null}
              <Text className="text-gray-400 text-xs mt-2">
                {new Date(item.date).toLocaleDateString()}
              </Text>
            </View>
          )}
          className="mt-4"
        />
      )}
    </View>
  );
}