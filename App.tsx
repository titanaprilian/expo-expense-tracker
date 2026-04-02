import "./global.css";
import AppNavigator from './src/navigation/AppNavigator';
import { useEffect } from 'react';
import { useExpenseStore } from './src/features/expense/hooks/useExpenseStore';

export default function App() {
  const hydrate = useExpenseStore((state) => state.hydrate);
  const hydrated = useExpenseStore((state) => state.hydrated);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (!hydrated) {
    return null;
  }

  return <AppNavigator />;
}