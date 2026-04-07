import { Text, View, FlatList, ColorSchemeName } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useExpenseStore } from '../features/expense/hooks/useExpenseStore';
import { useTotalSpending } from '../features/expense/hooks/useTotalSpending';
import { formatRupiah } from '../utils/currency';
import { COLORS } from '../constants/colors';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { AnimatedExpenseItem } from '../components/AnimatedExpenseItem';
import { FloatingActionButton } from '../components/FloatingActionButton';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
  colorScheme?: ColorSchemeName;
};

export default function HomeScreen({ navigation, colorScheme }: HomeScreenProps) {
  const expenses = useExpenseStore((state) => state.expenses);
  const totalSpending = useTotalSpending();
  
  const isDark = colorScheme === 'dark';
  const backgroundColor = isDark ? COLORS.dark.background : COLORS.background;
  const surfaceColor = isDark ? COLORS.dark.surface : COLORS.surface;
  const textPrimary = isDark ? COLORS.dark.text.primary : COLORS.text.primary;
  const textSecondary = isDark ? COLORS.dark.text.secondary : COLORS.text.secondary;
  const textMuted = isDark ? COLORS.dark.text.muted : COLORS.text.muted;
  const borderColor = isDark ? COLORS.dark.border : COLORS.border;

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor }}>
      <View style={{ backgroundColor: surfaceColor, padding: 16, marginBottom: 16, borderRadius: 12, borderWidth: 1, borderColor }}>
        <Text style={{ fontSize: 14, color: textSecondary }}>Total Spending</Text>
        <Text style={{ fontSize: 28, fontWeight: 'bold', marginTop: 4, color: textPrimary }}>{formatRupiah(totalSpending)}</Text>
      </View>
      
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: textPrimary }}>Expenses</Text>
      
      {expenses.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 16, color: textMuted }}>No expenses yet</Text>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <AnimatedExpenseItem 
              item={item} 
              index={index} 
              colorScheme={colorScheme}
              onPress={() => navigation.navigate('EditExpense', { expenseId: item.id })}
            />
          )}
          style={{ marginTop: 16 }}
        />
      )}

      <FloatingActionButton 
        onPress={() => navigation.navigate('AddExpense')}
        colorScheme={colorScheme}
      />
    </View>
  );
}
