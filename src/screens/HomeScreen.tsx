import { Text, View, Button, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useExpenseStore } from '../features/expense/hooks/useExpenseStore';
import { useTotalSpending } from '../features/expense/hooks/useTotalSpending';
import { formatRupiah } from '../utils/currency';
import { CATEGORY_COLORS } from '../features/expense/constants/categoryIcons';
import { COLORS } from '../constants/colors';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { AnimatedExpenseItem } from '../components/AnimatedExpenseItem';
import { AnimatedButton } from '../components/AnimatedButton';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const expenses = useExpenseStore((state) => state.expenses);
  const totalSpending = useTotalSpending();

  return (
    <View className="p-4 flex-1 bg-background">
      <View className="bg-surface p-4 mb-4 rounded-xl shadow-sm border border-color">
        <Text className="text-sm text-secondary">Total Spending</Text>
        <Text className="text-3xl font-bold mt-1 text-primary">{formatRupiah(totalSpending)}</Text>
      </View>
      
      <Text className="text-xl font-bold mb-4 text-primary">Expenses</Text>
      
      <AnimatedButton 
        onPress={() => navigation.navigate('AddExpense')}
        className="bg-primary p-3 rounded-lg items-center"
      >
        <Text className="text-surface font-semibold text-base">Add Expense</Text>
      </AnimatedButton>
      
      {expenses.length === 0 ? (
        <Text className="text-center mt-4 text-muted">No expenses yet</Text>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <AnimatedExpenseItem item={item} index={index} />
          )}
          className="mt-4"
        />
      )}
    </View>
  );
}
