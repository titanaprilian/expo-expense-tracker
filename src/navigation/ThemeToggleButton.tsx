import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useExpenseStore, ThemePreference } from '../features/expense/hooks/useExpenseStore';
import { COLORS } from '../constants/colors';
import { ColorSchemeName } from 'react-native';

interface ThemeToggleButtonProps {
  colorScheme: ColorSchemeName;
}

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({ colorScheme }) => {
  const { themePreference, setThemePreference } = useExpenseStore();

  const getNextThemePreference = (current: ThemePreference): ThemePreference => {
    if (current === 'system') return 'light';
    if (current === 'light') return 'dark';
    return 'system';
  };

  const getIconName = (current: ThemePreference) => {
    if (current === 'system') {
      return colorScheme === 'dark' ? 'moon-outline' : 'sunny-outline';
    }
    if (current === 'light') return 'sunny-outline';
    return 'moon-outline';
  };

  const toggleTheme = () => {
    const nextPreference = getNextThemePreference(themePreference);
    setThemePreference(nextPreference);
  };

  const iconColor = colorScheme === 'dark' ? COLORS.dark.text.primary : COLORS.text.primary;

  return (
    <TouchableOpacity onPress={toggleTheme} className="p-2">
      <Ionicons name={getIconName(themePreference)} size={24} color={iconColor} />
    </TouchableOpacity>
  );
};

export default ThemeToggleButton;
