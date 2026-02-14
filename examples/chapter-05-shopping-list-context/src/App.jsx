import { ShoppingListProvider } from './context/ShoppingListContext';
import { ShoppingList } from './ShoppingList';

export default function App() {
  return (
    <ShoppingListProvider>
      <ShoppingList />
    </ShoppingListProvider>
  );
}
