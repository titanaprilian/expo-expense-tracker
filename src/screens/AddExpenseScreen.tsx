import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useAddExpense, CATEGORIES } from '../features/expense/hooks/useAddExpense';
import { CATEGORY_ICONS, CATEGORY_COLORS } from '../features/expense/constants/categoryIcons';
import { COLORS } from '../constants/colors';
import { AnimatedButton } from '../components/AnimatedButton';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

type AddExpenseScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AddExpense'>;
};

function CategoryChip({ 
  category: cat, 
  selected, 
  onSelect 
}: { 
  category: string; 
  selected: boolean; 
  onSelect: () => void;
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

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        onPress={onSelect}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className="flex-row items-center gap-2 py-2 px-3 rounded-lg border"
        style={{ 
          backgroundColor: selected ? CATEGORY_COLORS[cat] + '20' : COLORS.surface,
          borderColor: selected ? CATEGORY_COLORS[cat] : COLORS.border,
        }}
      >
        <Ionicons 
          name={CATEGORY_ICONS[cat]} 
          size={20} 
          color={selected ? CATEGORY_COLORS[cat] : COLORS.text.secondary} 
        />
        <Text 
          style={{ 
            color: selected ? CATEGORY_COLORS[cat] : COLORS.text.secondary,
            fontWeight: selected ? '600' : '400',
          }}
        >
          {cat}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

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
          <CategoryChip 
            key={cat} 
            category={cat} 
            selected={category === cat}
            onSelect={() => setCategory(cat)}
          />
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

      <AnimatedButton 
        onPress={handleSave}
        className="bg-primary p-4 rounded-lg items-center"
      >
        <Text className="text-surface font-semibold text-base">Save</Text>
      </AnimatedButton>
    </View>
  );
}
