import { createContext, useContext, useMemo, useState } from 'react';

const ShoppingListContext = createContext(null);

export function ShoppingListProvider({ children }) {
  const [itemsByList, setItemsByList] = useState({
    default: [
      { id: '1', label: 'Milk', purchased: false },
      { id: '2', label: 'Coffee beans', purchased: true },
    ],
  });

  const value = useMemo(
    () => ({
      items: itemsByList.default ?? [],
      getItems: (listId = 'default') => itemsByList[listId] ?? [],
      addItem: (label, listId = 'default') => {
        setItemsByList((prev) => ({
          ...prev,
          [listId]: [
            ...(prev[listId] ?? []),
            { id: crypto.randomUUID(), label, purchased: false },
          ],
        }));
      },
      toggleItem: (id, listId = 'default') => {
        setItemsByList((prev) => ({
          ...prev,
          [listId]: (prev[listId] ?? []).map((item) =>
            item.id === id ? { ...item, purchased: !item.purchased } : item
          ),
        }));
      },
    }),
    [itemsByList]
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
