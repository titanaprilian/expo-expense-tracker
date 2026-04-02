import "./global.css";
import AppNavigator from './src/navigation/AppNavigator';
import { useEffect, useMemo } from 'react';
import { useExpenseStore, ThemePreference } from './src/features/expense/hooks/useExpenseStore';
import { useColorScheme } from "react-native";

export default function App() {
  const hydrate = useExpenseStore((state) => state.hydrate);
  const hydrated = useExpenseStore((state) => state.hydrated);
  const themePreference = useExpenseStore((state) => state.themePreference);
  const systemColorScheme = useColorScheme();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const activeColorScheme = useMemo(() => {
    if (themePreference === 'system') {
      return systemColorScheme;
    }
    return themePreference;
  }, [themePreference, systemColorScheme]);

  if (!hydrated) {
    return null;
  }

  return <AppNavigator className={activeColorScheme === 'dark' ? 'dark' : ''} colorScheme={activeColorScheme} />;
}