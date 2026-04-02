import { Text, View, Button } from 'react-native';
import { useExpenseStore } from '../store/useExpenseStore';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const expenses = useExpenseStore((state) => state.expenses);
  console.log('Store expenses:', expenses);

  return (
    <View>
      <Text>HomeScreen - Lists expenses (placeholder)</Text>
      <Button title="Add Expense" onPress={() => navigation.navigate('AddExpense')} />
    </View>
  );
}
