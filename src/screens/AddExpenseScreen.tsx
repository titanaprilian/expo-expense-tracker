import { Text, View, TextInput, TouchableOpacity, ColorSchemeName, Modal, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useAddExpense, CATEGORIES } from '../features/expense/hooks/useAddExpense';
import { CATEGORY_ICONS, CATEGORY_COLORS } from '../features/expense/constants/categoryIcons';
import { COLORS } from '../constants/colors';
import { AnimatedButton } from '../components/AnimatedButton';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useState } from 'react';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

type AddExpenseScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AddExpense'>;
  colorScheme?: ColorSchemeName;
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

export default function AddExpenseScreen({ navigation, colorScheme }: AddExpenseScreenProps) {
  const isDark = colorScheme === 'dark';
  
  const { amount, setAmount, category, setCategory, note, setNote, date, setDate, handleSave } = useAddExpense(navigation);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const backgroundColor = isDark ? COLORS.dark.background : COLORS.background;
  const surfaceColor = isDark ? COLORS.dark.surface : COLORS.surface;
  const textPrimary = isDark ? COLORS.dark.text.primary : COLORS.text.primary;
  const textSecondary = isDark ? COLORS.dark.text.secondary : COLORS.text.secondary;
  const textMuted = isDark ? COLORS.dark.text.muted : COLORS.text.muted;
  const borderColor = isDark ? COLORS.dark.border : COLORS.border;

  const formatDisplayDate = (d: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (d.toDateString() === today.toDateString()) return 'Today';
    if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  };

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
        onChangeText={setAmount}
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
              {(Platform.OS === 'ios' || Platform.OS === 'android') && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                    if (selectedDate) {
                      setDate(selectedDate);
                    }
                  }}
                  style={{ height: 200 }}
                />
              )}
            </View>
          </View>
        </Modal>
      )}

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

      <AnimatedButton 
        onPress={handleSave}
        colorScheme={colorScheme}
      >
        <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>Save</Text>
      </AnimatedButton>
    </View>
  );
}
