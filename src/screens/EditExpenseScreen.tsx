import { useEffect, useState, useCallback } from 'react';
import { Text, View, TextInput, TouchableOpacity, ColorSchemeName, Modal } from 'react-native';
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
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

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
  const [date, setDate] = useState(existingExpense ? new Date(existingExpense.date) : new Date());
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const hasChanges = existingExpense && (
    parseRupiah(amount) !== existingExpense.amount ||
    category !== existingExpense.category ||
    note !== (existingExpense.note || '') ||
    date.toISOString().split('T')[0] !== new Date(existingExpense.date).toISOString().split('T')[0]
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
      date: date.toISOString(),
    });
    
    navigation.goBack();
  };

  const confirmDelete = () => {
    if (expenseId) {
      deleteExpense(expenseId);
      setShowDeleteModal(false);
      navigation.goBack();
    }
  };

  const handleDeletePress = () => {
    setShowDeleteModal(true);
  };

  const formatDisplayDate = (d: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (d.toDateString() === today.toDateString()) return 'Today';
    if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  };

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

      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8, color: textPrimary }}>Date</Text>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 20,
          borderRadius: 8,
          backgroundColor: surfaceColor,
          borderColor: borderColor,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ color: textPrimary, fontSize: 16 }}>{formatDisplayDate(date)}</Text>
        <Ionicons name="calendar-outline" size={20} color={textSecondary} />
      </TouchableOpacity>

      {showDatePicker && (
        <Modal
          visible={true}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowDatePicker(false)}
        >
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <View style={{ backgroundColor: surfaceColor, borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: 40 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: borderColor }}>
                <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                  <Text style={{ color: textSecondary, fontSize: 16 }}>Cancel</Text>
                </TouchableOpacity>
                <Text style={{ color: textPrimary, fontSize: 18, fontWeight: '600' }}>Select Date</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                  <Text style={{ color: COLORS.primary, fontSize: 16, fontWeight: '600' }}>Done</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={date}
                mode="date"
                display="spinner"
                onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                  if (selectedDate) {
                    setDate(selectedDate);
                  }
                }}
                style={{ height: 200 }}
              />
            </View>
          </View>
        </Modal>
      )}

      {hasChanges ? (
        <AnimatedButton 
          onPress={handleUpdate}
          colorScheme={colorScheme}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>Update</Text>
        </AnimatedButton>
      ) : (
        <AnimatedButton 
          onPress={handleDeletePress}
          colorScheme={colorScheme}
          isDelete={true}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>Delete</Text>
        </AnimatedButton>
      )}

      <Modal
        visible={showDeleteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: surfaceColor, padding: 24, borderRadius: 12, width: '80%' }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: textPrimary, marginBottom: 8 }}>Delete Expense</Text>
            <Text style={{ fontSize: 16, color: textSecondary, marginBottom: 24 }}>Are you sure you want to delete this expense?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 12 }}>
              <TouchableOpacity 
                onPress={() => setShowDeleteModal(false)}
                style={{ paddingVertical: 10, paddingHorizontal: 20 }}
              >
                <Text style={{ color: textSecondary, fontSize: 16 }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={confirmDelete}
                style={{ backgroundColor: '#DC2626', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 }}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}