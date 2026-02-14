import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { Platform } from 'react-native';

export type ShoppingItem = {
  id: string;
  title: string;
  category: 'Produce' | 'Pantry' | 'Household' | 'Other';
  quantity: number;
  purchased: boolean;
  notes?: string;
};

type ShoppingListContextValue = {
  items: ShoppingItem[];
  purchasedCount: number;
  addItem: (item: Omit<ShoppingItem, 'id' | 'purchased'>) => void;
  togglePurchased: (id: string) => void;
  updateNotes: (id: string, notes: string) => void;
};

const ShoppingListContext = createContext<ShoppingListContextValue | undefined>(undefined);

function createId() {
  if (typeof globalThis.crypto?.randomUUID === 'function') {
    return globalThis.crypto.randomUUID();
  }

  return `${Platform.OS}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

const starterItems: ShoppingItem[] = [
  { id: '1', title: 'Bananas', category: 'Produce', quantity: 6, purchased: false },
  { id: '2', title: 'Coffee Beans', category: 'Pantry', quantity: 1, purchased: true },
  {
    id: '3',
    title: 'Dish Soap',
    category: 'Household',
    quantity: 2,
    purchased: false,
    notes: 'Unscented if available',
  },
];

export function ShoppingListProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ShoppingItem[]>(starterItems);

  const value = useMemo<ShoppingListContextValue>(
    () => ({
      items,
      purchasedCount: items.filter((item) => item.purchased).length,
      addItem: (item) => {
        setItems((previous) => [...previous, { ...item, id: createId(), purchased: false }]);
      },
      togglePurchased: (id) => {
        setItems((previous) =>
          previous.map((item) =>
            item.id === id ? { ...item, purchased: !item.purchased } : item
          )
        );
      },
      updateNotes: (id, notes) => {
        setItems((previous) =>
          previous.map((item) => (item.id === id ? { ...item, notes } : item))
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
    throw new Error('useShoppingList must be used inside ShoppingListProvider');
  }

  return context;
}
