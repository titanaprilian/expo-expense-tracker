import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useAddExpense, CATEGORIES } from '../features/expense/hooks/useAddExpense';
import { CATEGORY_ICONS, CATEGORY_COLORS } from '../features/expense/constants/categoryIcons';
import { COLORS } from '../constants/colors';

type AddExpenseScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AddExpense'>;
};

export default function AddExpenseScreen({ navigation }: AddExpenseScreenProps) {
  const { amount, setAmount, category, setCategory, note, setNote, handleSave } = useAddExpense(navigation);

  return (
    <View style={{ padding: 16, backgroundColor: COLORS.background, flex: 1 }}>
      <Text className="text-lg font-semibold mb-2" style={{ color: COLORS.text.primary }}>Amount</Text>
      <TextInput
        style={{ 
          borderWidth: 1, 
          padding: 12, 
          marginBottom: 20, 
          borderRadius: 8,
          backgroundColor: COLORS.surface,
          borderColor: COLORS.border,
          color: COLORS.text.primary,
        }}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholder="Enter amount"
        placeholderTextColor={COLORS.text.muted}
      />

      <Text className="text-lg font-semibold mb-3" style={{ color: COLORS.text.primary }}>Category</Text>
      <View style={{ marginBottom: 20, flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setCategory(cat)}
            style={{ 
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              paddingVertical: 10,
              paddingHorizontal: 14,
              borderRadius: 8,
              backgroundColor: category === cat ? CATEGORY_COLORS[cat] + '20' : COLORS.surface,
              borderWidth: 1,
              borderColor: category === cat ? CATEGORY_COLORS[cat] : COLORS.border,
            }}
          >
            <Ionicons 
              name={CATEGORY_ICONS[cat]} 
              size={20} 
              color={category === cat ? CATEGORY_COLORS[cat] : COLORS.text.secondary} 
            />
            <Text style={{ 
              color: category === cat ? CATEGORY_COLORS[cat] : COLORS.text.secondary,
              fontWeight: category === cat ? '600' : '400',
            }}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text className="text-lg font-semibold mb-2" style={{ color: COLORS.text.primary }}>Note (optional)</Text>
      <TextInput
        style={{ 
          borderWidth: 1, 
          padding: 12, 
          marginBottom: 20, 
          borderRadius: 8,
          backgroundColor: COLORS.surface,
          borderColor: COLORS.border,
          color: COLORS.text.primary,
        }}
        value={note}
        onChangeText={setNote}
        placeholder="Enter note"
        placeholderTextColor={COLORS.text.muted}
      />

      <TouchableOpacity 
        onPress={handleSave}
        style={{ 
          backgroundColor: COLORS.primary,
          padding: 14,
          borderRadius: 8,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: COLORS.surface, fontWeight: '600', fontSize: 16 }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
