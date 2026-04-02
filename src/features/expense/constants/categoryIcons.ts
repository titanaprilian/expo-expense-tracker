import { Ionicons } from '@expo/vector-icons';

export type CategoryIconName = keyof typeof Ionicons.glyphMap;

export const CATEGORY_ICONS: Record<string, CategoryIconName> = {
  Food: 'restaurant-outline',
  Transport: 'car-outline',
  Shopping: 'bag-outline',
  Bills: 'receipt-outline',
  Entertainment: 'game-controller-outline',
  Health: 'medical-outline',
  Other: 'ellipsis-horizontal-outline',
};

export const CATEGORY_COLORS: Record<string, string> = {
  Food: '#F59E0B',
  Transport: '#3B82F6',
  Shopping: '#EC4899',
  Bills: '#8B5CF6',
  Entertainment: '#10B981',
  Health: '#EF4444',
  Other: '#6B7280',
};
