import { Text, View, FlatList, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useExpenseStore } from '../features/expense/hooks/useExpenseStore';
import { useTotalSpending } from '../features/expense/hooks/useTotalSpending';
import { formatRupiah } from '../utils/currency';
import { COLORS } from '../constants/colors';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { AnimatedExpenseItem } from '../components/AnimatedExpenseItem';
import { AnimatedButton } from '../components/AnimatedButton';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const colorScheme = useColorScheme();
  const expenses = useExpenseStore((state) => state.expenses);
  const totalSpending = useTotalSpending();
  
  const isDark = colorScheme === 'dark';
  const backgroundColor = isDark ? COLORS.dark.background : COLORS.background;
  const surfaceColor = isDark ? COLORS.dark.surface : COLORS.surface;
  const textPrimary = isDark ? COLORS.dark.text.primary : COLORS.text.primary;
  const textSecondary = isDark ? COLORS.dark.text.secondary : COLORS.text.secondary;
  const textMuted = isDark ? COLORS.dark.text.muted : COLORS.text.muted;

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor }}>
      <View style={{ backgroundColor: surfaceColor, padding: 16, marginBottom: 16, borderRadius: 12, borderWidth: 1, borderColor: isDark ? COLORS.dark.border : COLORS.border }}>
        <Text style={{ fontSize: 14, color: textSecondary }}>Total Spending</Text>
        <Text style={{ fontSize: 28, fontWeight: 'bold', marginTop: 4, color: textPrimary }}>{formatRupiah(totalSpending)}</Text>
      </View>
      
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: textPrimary }}>Expenses</Text>
      
      <AnimatedButton 
        onPress={() => navigation.navigate('AddExpense')}
      >
        <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>Add Expense</Text>
      </AnimatedButton>
      
      {expenses.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 16, color: textMuted }}>No expenses yet</Text>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <AnimatedExpenseItem item={item} index={index} colorScheme={colorScheme} />
          )}
          style={{ marginTop: 16 }}
        />
      )}
    </View>
  );
}
