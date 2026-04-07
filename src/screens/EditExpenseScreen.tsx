import { useEffect, useState, useCallback } from 'react';
import { Text, View, TextInput, TouchableOpacity, ColorSchemeName, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { CATEGORIES } from '../features/expense/hooks/useAddExpense';
import { CATEGORY_ICONS, CATEGORY_COLORS } from '../features/expense/constants/categoryIcons';
import { COLORS } from '../constants/colors';
import { AnimatedButton } from '../components/AnimatedButton';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useExpenseStore } from '../features/expense/hooks/useExpenseStore';
import type { Expense } from '../features/expense/types';
import { formatRupiah, parseRupiah } from '../utils/currency';

type EditExpenseScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'EditExpense'>;
  colorScheme?: ColorSchemeName;
  route?: { params: { expenseId: string } };
};

function CategoryChip({ 
  category: cat, 
  selected, 
  onSelect,
  isDark,
  textSecondary
}: { 
  category: string; 
  selected: boolean; 
  onSelect: () => void;
  isDark: boolean;
  textSecondary: string;
}) {
  const scale = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.92, { damping: 15, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
  };

  const surfaceColor = isDark ? COLORS.dark.surface : COLORS.surface;
  const borderColor = isDark ? COLORS.dark.border : COLORS.border;

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        onPress={onSelect}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{ 
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 8,
          borderWidth: 1,
          backgroundColor: selected ? CATEGORY_COLORS[cat] + '20' : surfaceColor,
          borderColor: selected ? CATEGORY_COLORS[cat] : borderColor,
        }}
      >
        <Ionicons 
          name={CATEGORY_ICONS[cat]} 
          size={20} 
          color={selected ? CATEGORY_COLORS[cat] : textSecondary} 
        />
        <Text 
          style={{ 
            color: selected ? CATEGORY_COLORS[cat] : textSecondary,
            fontWeight: selected ? '600' : '400',
            fontSize: 14,
          }}
        >
          {cat}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function EditExpenseScreen({ navigation, colorScheme, route }: EditExpenseScreenProps) {
  const isDark = colorScheme === 'dark';
  const updateExpense = useExpenseStore((state) => state.updateExpense);
  const deleteExpense = useExpenseStore((state) => state.deleteExpense);
  
  const expenseId = route?.params?.expenseId;
  const expenses = useExpenseStore((state) => state.expenses);
  const existingExpense = expenses.find((e) => e.id === expenseId);
  
  const [amount, setAmount] = useState(existingExpense ? formatRupiah(existingExpense.amount) : '');
  const [category, setCategory] = useState(existingExpense?.category || CATEGORIES[0]);
  const [note, setNote] = useState(existingExpense?.note || '');

  const hasChanges = existingExpense && (
    parseRupiah(amount) !== existingExpense.amount ||
    category !== existingExpense.category ||
    note !== (existingExpense.note || '')
  );

  const handleAmountChange = (value: string) => {
    const numericValue = parseRupiah(value);
    if (numericValue > 0) {
      setAmount(formatRupiah(numericValue));
    } else {
      setAmount(value.replace(/[^0-9]/g, ''));
    }
  };

  const handleUpdate = () => {
    if (!expenseId || !amount) return;
    
    const numericAmount = parseRupiah(amount);
    updateExpense(expenseId, {
      amount: numericAmount,
      category,
      note,
    });
    
    navigation.goBack();
  };

  const handleDelete = useCallback(() => {
    console.log('handleDelete called, expenseId:', expenseId);
    console.log('About to call Alert.alert');
    Alert.alert(
      'Delete Expense',
      'Are you sure you want to delete this expense?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            console.log('Delete pressed, calling deleteExpense with:', expenseId);
            console.log('Current expenses before delete:', useExpenseStore.getState().expenses);
            if (expenseId) {
              console.log('About to call deleteExpense');
              deleteExpense(expenseId);
              console.log('After deleteExpense call');
              console.log('Expenses after delete:', useExpenseStore.getState().expenses);
              console.log('About to call navigation.goBack()');
              navigation.goBack();
            } else {
              console.log('expenseId is falsy:', expenseId);
            }
          }
        },
      ]
    );
    console.log('Alert.alert called');
  }, [expenseId, deleteExpense, navigation]);

  const backgroundColor = isDark ? COLORS.dark.background : COLORS.background;
  const surfaceColor = isDark ? COLORS.dark.surface : COLORS.surface;
  const textPrimary = isDark ? COLORS.dark.text.primary : COLORS.text.primary;
  const textSecondary = isDark ? COLORS.dark.text.secondary : COLORS.text.secondary;
  const textMuted = isDark ? COLORS.dark.text.muted : COLORS.text.muted;
  const borderColor = isDark ? COLORS.dark.border : COLORS.border;

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor }}>
      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8, color: textPrimary }}>Amount</Text>
      <TextInput
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 20,
          borderRadius: 8,
          backgroundColor: surfaceColor,
          borderColor: borderColor,
          color: textPrimary,
          fontSize: 16,
        }}
        value={amount}
        onChangeText={handleAmountChange}
        keyboardType="numeric"
        placeholder="Enter amount"
        placeholderTextColor={textMuted}
      />

      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 12, color: textPrimary }}>Category</Text>
      <View style={{ marginBottom: 20, flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {CATEGORIES.map((cat) => (
          <CategoryChip 
            key={cat} 
            category={cat} 
            selected={category === cat}
            onSelect={() => setCategory(cat)}
            isDark={isDark}
            textSecondary={textSecondary}
          />
        ))}
      </View>

      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8, color: textPrimary }}>Note (optional)</Text>
      <TextInput
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 20,
          borderRadius: 8,
          backgroundColor: surfaceColor,
          borderColor: borderColor,
          color: textPrimary,
          fontSize: 16,
        }}
        value={note}
        onChangeText={setNote}
        placeholder="Enter note"
        placeholderTextColor={textMuted}
      />

      {hasChanges ? (
        <AnimatedButton 
          onPress={handleUpdate}
          colorScheme={colorScheme}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>Update</Text>
        </AnimatedButton>
      ) : (
        <AnimatedButton 
          onPress={handleDelete}
          colorScheme={colorScheme}
          isDelete={true}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>Delete</Text>
        </AnimatedButton>
      )}
    </View>
  );
}