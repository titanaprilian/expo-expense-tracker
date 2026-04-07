import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import { View, ColorSchemeName } from 'react-native';
import { COLORS } from '../constants/colors';
import ThemeToggleButton from './ThemeToggleButton';

export type RootStackParamList = {
  Home: undefined;
  AddExpense: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator({ className, colorScheme }: { className?: string; colorScheme: ColorSchemeName }) {
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <View className={`flex-1 ${className}`}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          id="MainStack"
          screenOptions={{
            headerStyle: {
              backgroundColor: colorScheme === 'dark' ? COLORS.dark.surface : COLORS.surface,
            },
            headerTintColor: colorScheme === 'dark' ? COLORS.dark.text.primary : COLORS.text.primary,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            animation: 'slide_from_right',
            gestureEnabled: true,
            gestureDirection: 'horizontal',
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ 
              title: 'Home',
              headerRight: () => <ThemeToggleButton colorScheme={colorScheme} />,
            }}
          />
          <Stack.Screen
            name="AddExpense"
            component={AddExpenseScreen}
            options={{ title: 'Add Expense' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
