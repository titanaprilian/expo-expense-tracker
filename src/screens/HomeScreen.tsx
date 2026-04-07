import { Text, View, SectionList, ColorSchemeName } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useExpenseStore } from '../features/expense/hooks/useExpenseStore';
import { useTotalSpending } from '../features/expense/hooks/useTotalSpending';
import { formatRupiah } from '../utils/currency';
import { COLORS } from '../constants/colors';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { AnimatedExpenseItem } from '../components/AnimatedExpenseItem';
import { FloatingActionButton } from '../components/FloatingActionButton';
import type { Expense } from '../features/expense/types';

type SectionData = {
  title: string;
  data: Expense[];
};

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

  const getSectionTitle = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const groupedExpenses = expenses.reduce((sections: SectionData[], expense) => {
    const title = getSectionTitle(expense.date);
    const existingSection = sections.find(section => section.title === title);
    
    if (existingSection) {
      existingSection.data.push(expense);
    } else {
      sections.push({ title, data: [expense] });
    }
    
    return sections;
  }, []);

  groupedExpenses.forEach(section => {
    section.data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  });

  groupedExpenses.sort((a, b) => {
    const dateA = new Date(a.data[0].date).getTime();
    const dateB = new Date(b.data[0].date).getTime();
    return dateB - dateA;
  });

  const renderSectionHeader = ({ section }: { section: SectionData }) => (
    <Text style={{ 
      fontSize: 14, 
      fontWeight: '600', 
      color: textSecondary, 
      marginTop: 16, 
      marginBottom: 8 
    }}>
      {section.title}
    </Text>
  );

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
        <SectionList
          sections={groupedExpenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <AnimatedExpenseItem 
              item={item} 
              index={index} 
              colorScheme={colorScheme}
              onPress={() => navigation.navigate('EditExpense', { expenseId: item.id })}
            />
          )}
          renderSectionHeader={renderSectionHeader}
          style={{ marginTop: 16 }}
          stickySectionHeadersEnabled={false}
        />
      )}

      <FloatingActionButton 
        onPress={() => navigation.navigate('AddExpense')}
        colorScheme={colorScheme}
      />
    </View>
  );
}
