import { ShoppingListProvider } from './context/ShoppingListContext';
import { ShoppingList } from './ShoppingList';

export function App() {
  return (
    <ShoppingListProvider>
      <ShoppingList />
    </ShoppingListProvider>
  );
}
