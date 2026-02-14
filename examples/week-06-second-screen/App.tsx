import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ShoppingListProvider } from './src/context/ShoppingListContext';
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <ShoppingListProvider>
        <StatusBar style="dark" />
        <RootNavigator />
      </ShoppingListProvider>
    </SafeAreaProvider>
  );
}
