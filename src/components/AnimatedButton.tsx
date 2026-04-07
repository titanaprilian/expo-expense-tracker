import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface AnimatedButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  className?: string;
  style?: ViewStyle;
  disabled?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function AnimatedButton({ onPress, children, className, style, disabled }: AnimatedButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: disabled ? 0.5 : 1,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[animatedStyle, style]}
      className={className}
    >
      {children}
    </AnimatedPressable>
  );
}

interface CategoryChipProps {
  selected: boolean;
  onPress: () => void;
  children: React.ReactNode;
  icon: React.ReactNode;
  color: string;
}

export function AnimatedCategoryChip({ selected, onPress, children, icon, color }: CategoryChipProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.3);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedOpacityStyle = useAnimatedStyle(() => ({
    opacity: selected ? 0.2 : 0,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.92, { damping: 15, stiffness: 400 });
    opacity.value = withSpring(0.4, { damping: 15, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
    opacity.value = withSpring(selected ? 0.2 : 0, { damping: 15, stiffness: 400 });
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[animatedContainerStyle]}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: color, borderRadius: 8 },
          animatedOpacityStyle,
        ]}
      />
      <Animated.View
        style={[
          styles.chip,
          {
            borderColor: selected ? color : '#E5E7EB',
          },
        ]}
      >
        {icon}
        <Text
          style={[
            styles.chipText,
            { color: selected ? color : '#6B7280' },
          ]}
        >
          {children}
        </Text>
      </Animated.View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
  },
});