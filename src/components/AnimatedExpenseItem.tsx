import { useEffect } from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withDelay } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORY_ICONS, CATEGORY_COLORS } from '../features/expense/constants/categoryIcons';
import { formatRupiah } from '../utils/currency';
import type { Expense } from '../features/expense/types';

interface AnimatedExpenseItemProps {
  item: Expense;
  index: number;
}

export function AnimatedExpenseItem({ item, index }: AnimatedExpenseItemProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const translateY = useSharedValue(50);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      index * 100,
      withSpring(0, { damping: 18, stiffness: 150 })
    );
    opacity.value = withDelay(
      index * 100,
      withSpring(1, { damping: 18, stiffness: 150 })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const cardBackgroundColor = isDark ? '#1E293B' : '#FFFFFF';
  const textPrimary = isDark ? '#F8FAFC' : '#1F2937';
  const textSecondary = isDark ? '#E2E8F0' : '#6B7280';
  const textMuted = isDark ? '#94A3B8' : '#9CA3AF';

  return (
    <Animated.View style={[styles.container, animatedStyle, { backgroundColor: cardBackgroundColor }]}>
      <View style={styles.row}>
        <View style={styles.leftContent}>
          <View style={[styles.iconContainer, { backgroundColor: CATEGORY_COLORS[item.category] + '20' }]}>
            <Ionicons name={CATEGORY_ICONS[item.category]} size={20} color={CATEGORY_COLORS[item.category]} />
          </View>
          <Text style={[styles.category, { color: textPrimary }]}>{item.category}</Text>
        </View>
        <Text style={[styles.amount, { color: isDark ? '#34D399' : '#10B981' }]}>{formatRupiah(item.amount)}</Text>
      </View>
      {item.note ? (
        <Text style={[styles.note, { color: textSecondary }]}>{item.note}</Text>
      ) : null}
      <Text style={[styles.date, { color: textMuted }]}>
        {new Date(item.date).toLocaleDateString()}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  category: {
    fontSize: 16,
    fontWeight: '600',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  note: {
    fontSize: 14,
    marginTop: 8,
  },
  date: {
    fontSize: 12,
    marginTop: 8,
  },
});