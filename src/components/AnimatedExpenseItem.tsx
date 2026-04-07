import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.row}>
        <View style={styles.leftContent}>
          <View style={[styles.iconContainer, { backgroundColor: CATEGORY_COLORS[item.category] + '20' }]}>
            <Ionicons name={CATEGORY_ICONS[item.category]} size={20} color={CATEGORY_COLORS[item.category]} />
          </View>
          <Text style={styles.category}>{item.category}</Text>
        </View>
        <Text style={styles.amount}>{formatRupiah(item.amount)}</Text>
      </View>
      {item.note ? (
        <Text style={styles.note}>{item.note}</Text>
      ) : null}
      <Text style={styles.date}>
        {new Date(item.date).toLocaleDateString()}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
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
    color: '#1F2937',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10B981',
  },
  note: {
    fontSize: 14,
    marginTop: 8,
    color: '#6B7280',
  },
  date: {
    fontSize: 12,
    marginTop: 8,
    color: '#9CA3AF',
  },
});