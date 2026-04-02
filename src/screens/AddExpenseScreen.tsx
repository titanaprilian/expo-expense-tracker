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
    <View className="p-4 flex-1 bg-background">
      <Text className="text-lg font-semibold mb-2 text-primary">Amount</Text>
      <TextInput
        className="border p-3 mb-5 rounded-lg bg-surface border-color text-primary"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholder="Enter amount"
        placeholderTextColor={COLORS.text.muted}
      />

      <Text className="text-lg font-semibold mb-3 text-primary">Category</Text>
      <View className="mb-5 flex-row flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setCategory(cat)}
            className="flex-row items-center gap-2 py-2 px-3 rounded-lg border"
            style={{ 
              backgroundColor: category === cat ? CATEGORY_COLORS[cat] + '20' : COLORS.surface,
              borderColor: category === cat ? CATEGORY_COLORS[cat] : COLORS.border,
            }}
          >
            <Ionicons 
              name={CATEGORY_ICONS[cat]} 
              size={20} 
              color={category === cat ? CATEGORY_COLORS[cat] : COLORS.text.secondary} 
            />
            <Text 
              style={{ 
                color: category === cat ? CATEGORY_COLORS[cat] : COLORS.text.secondary,
                fontWeight: category === cat ? '600' : '400',
              }}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text className="text-lg font-semibold mb-2 text-primary">Note (optional)</Text>
      <TextInput
        className="border p-3 mb-5 rounded-lg bg-surface border-color text-primary"
        value={note}
        onChangeText={setNote}
        placeholder="Enter note"
        placeholderTextColor={COLORS.text.muted}
      />

      <TouchableOpacity 
        onPress={handleSave}
        className="bg-primary p-4 rounded-lg items-center"
      >
        <Text className="text-surface font-semibold text-base">Save</Text>
      </TouchableOpacity>
    </View>
  );
}
