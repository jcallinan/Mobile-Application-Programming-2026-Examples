import { createContext, useContext, useMemo, useState } from 'react';

const ShoppingListContext = createContext(null);

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export function ShoppingListProvider({ children }) {
  const [itemsByList, setItemsByList] = useState({
    default: [
      {
        id: '1',
        label: 'Milk',
        purchased: false,
        dueDate: '2026-02-20',
        priority: 'High',
        category: 'Dairy',
        quantity: 2,
        notes: 'Prefer low-fat if available',
      },
      {
        id: '2',
        label: 'Coffee beans',
        purchased: true,
        dueDate: '2026-02-16',
        priority: 'Medium',
        category: 'General',
        quantity: 1,
        notes: 'Dark roast',
      },
    ],
  });

  const value = useMemo(
    () => ({
      items: itemsByList.default ?? [],
      getItems: (listId = 'default') => itemsByList[listId] ?? [],
      addItem: (item, listId = 'default') => {
        setItemsByList((prev) => ({
          ...prev,
          [listId]: [
            ...(prev[listId] ?? []),
            {
              id: createId(),
              purchased: false,
              dueDate: '',
              priority: 'Medium',
              category: 'General',
              quantity: 1,
              notes: '',
              ...item,
            },
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

  return (
    <ShoppingListContext.Provider value={value}>
      {children}
    </ShoppingListContext.Provider>
  );
}

export function useShoppingList() {
  const context = useContext(ShoppingListContext);
  if (!context) {
    throw new Error('useShoppingList must be used within ShoppingListProvider');
  }
  return context;
}
