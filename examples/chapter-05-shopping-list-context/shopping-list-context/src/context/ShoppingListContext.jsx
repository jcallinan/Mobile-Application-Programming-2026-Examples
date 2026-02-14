import { createContext, useContext, useMemo, useState } from 'react';

const ShoppingListContext = createContext(null);

export function ShoppingListProvider({ children }) {
  const [items, setItems] = useState([
    { id: '1', label: 'Milk', purchased: false },
    { id: '2', label: 'Coffee beans', purchased: true },
  ]);

  const value = useMemo(
    () => ({
      items,
      addItem: (label) => {
        setItems((prev) => [...prev, { id: crypto.randomUUID(), label, purchased: false }]);
      },
      toggleItem: (id) => {
        setItems((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, purchased: !item.purchased } : item
          )
        );
      },
    }),
    [items]
  );

  return <ShoppingListContext.Provider value={value}>{children}</ShoppingListContext.Provider>;
}

export function useShoppingList() {
  const context = useContext(ShoppingListContext);
  if (!context) {
    throw new Error('useShoppingList must be used within ShoppingListProvider');
  }
  return context;
}
