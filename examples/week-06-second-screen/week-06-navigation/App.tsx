import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ShoppingListProvider } from './context/ShoppingListContext';
import { RootNavigator } from './navigation/RootNavigator';

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
