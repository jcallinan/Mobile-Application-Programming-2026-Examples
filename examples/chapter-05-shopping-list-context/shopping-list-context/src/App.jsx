import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { ShoppingListProvider } from './context/ShoppingListContext';
import { ShoppingList } from './ShoppingList';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ShoppingListProvider>
        <ShoppingList />
      </ShoppingListProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
