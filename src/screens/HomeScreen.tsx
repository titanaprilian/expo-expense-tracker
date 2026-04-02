import { Text, View, Button, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useExpenseStore } from '../features/expense/hooks/useExpenseStore';
import { useTotalSpending } from '../features/expense/hooks/useTotalSpending';
import { formatRupiah } from '../utils/currency';
import { CATEGORY_ICONS, CATEGORY_COLORS } from '../features/expense/constants/categoryIcons';
import { COLORS } from '../constants/colors';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const expenses = useExpenseStore((state) => state.expenses);
  const totalSpending = useTotalSpending();

  return (
    <View className="p-4 flex-1" style={{ backgroundColor: COLORS.background }}>
      <View className="bg-white p-4 mb-4 rounded-xl shadow-sm" style={{ borderColor: COLORS.border, borderWidth: 1 }}>
        <Text className="text-sm" style={{ color: COLORS.text.secondary }}>Total Spending</Text>
        <Text className="text-3xl font-bold mt-1" style={{ color: COLORS.text.primary }}>{formatRupiah(totalSpending)}</Text>
      </View>
      
      <Text className="text-xl font-bold mb-4" style={{ color: COLORS.text.primary }}>Expenses</Text>
      
      <Button 
        title="Add Expense" 
        onPress={() => navigation.navigate('AddExpense')} 
        color={COLORS.primary}
      />
      
      {expenses.length === 0 ? (
        <Text className="text-center mt-4" style={{ color: COLORS.text.muted }}>No expenses yet</Text>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="bg-white p-4 mb-2 rounded-xl shadow-sm" style={{ borderColor: COLORS.border, borderWidth: 1 }}>
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 rounded-lg items-center justify-center" style={{ backgroundColor: CATEGORY_COLORS[item.category] + '20' }}>
                    <Ionicons name={CATEGORY_ICONS[item.category]} size={20} color={CATEGORY_COLORS[item.category]} />
                  </View>
                  <Text className="text-lg font-semibold" style={{ color: COLORS.text.primary }}>{item.category}</Text>
                </View>
                <Text className="text-xl font-bold" style={{ color: COLORS.success }}>{formatRupiah(item.amount)}</Text>
              </View>
              {item.note ? (
                <Text className="text-sm mt-2" style={{ color: COLORS.text.secondary }}>{item.note}</Text>
              ) : null}
              <Text className="text-xs mt-2" style={{ color: COLORS.text.muted }}>
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
