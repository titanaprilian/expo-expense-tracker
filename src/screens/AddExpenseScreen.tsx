import { Text, View, TextInput, TouchableOpacity, ColorSchemeName, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useAddExpense, CATEGORIES } from '../features/expense/hooks/useAddExpense';
import { CATEGORY_ICONS, CATEGORY_COLORS } from '../features/expense/constants/categoryIcons';
import { COLORS } from '../constants/colors';
import { AnimatedButton } from '../components/AnimatedButton';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useState } from 'react';

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
        onPress={() => {
          console.log('Date button pressed, setting showDatePicker to true');
          setShowDatePicker(true);
        }}
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
          animationType="fade"
          onRequestClose={() => setShowDatePicker(false)}
        >
          <TouchableOpacity 
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}
            activeOpacity={1}
            onPress={() => setShowDatePicker(false)}
          >
            <TouchableOpacity 
              activeOpacity={1}
              onPress={() => {}}
              style={{ backgroundColor: surfaceColor, borderRadius: 16, padding: 20, width: '85%' }}
            >
              <Text style={{ fontSize: 18, fontWeight: '600', color: textPrimary, marginBottom: 16, textAlign: 'center' }}>Select Date</Text>
              
              <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 12, marginBottom: 20 }}>
                <TouchableOpacity 
                  onPress={() => {
                    const today = new Date();
                    setDate(today);
                    setShowDatePicker(false);
                  }}
                  style={{ paddingVertical: 12, paddingHorizontal: 20, backgroundColor: COLORS.primary, borderRadius: 8 }}
                >
                  <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>Today</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  onPress={() => {
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    setDate(yesterday);
                    setShowDatePicker(false);
                  }}
                  style={{ paddingVertical: 12, paddingHorizontal: 20, backgroundColor: isDark ? '#374151' : '#E5E7EB', borderRadius: 8 }}
                >
                  <Text style={{ color: textPrimary, fontWeight: '600' }}>Yesterday</Text>
                </TouchableOpacity>
              </View>
              
              <View style={{ borderTopWidth: 1, borderTopColor: borderColor, paddingTop: 16 }}>
                <Text style={{ fontSize: 14, color: textSecondary, marginBottom: 8 }}>Or enter date:</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    padding: 12,
                    borderRadius: 8,
                    backgroundColor: isDark ? COLORS.dark.background : COLORS.background,
                    borderColor: borderColor,
                    color: textPrimary,
                    fontSize: 16,
                  }}
                  placeholder="DD/MM/YYYY"
                  placeholderTextColor={textMuted}
                  onChangeText={(text) => {
                    const parts = text.split('/');
                    if (parts.length === 3) {
                      const day = parseInt(parts[0], 10);
                      const month = parseInt(parts[1], 10) - 1;
                      const year = parseInt(parts[2], 10);
                      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
                        setDate(new Date(year, month, day));
                      }
                    }
                  }}
                />
              </View>
              
              <TouchableOpacity 
                onPress={() => setShowDatePicker(false)}
                style={{ marginTop: 20, padding: 12, alignItems: 'center' }}
              >
                <Text style={{ color: COLORS.primary, fontSize: 16, fontWeight: '600' }}>Close</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </TouchableOpacity>
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
