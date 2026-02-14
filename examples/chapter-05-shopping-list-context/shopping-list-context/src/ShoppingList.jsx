import { useState } from 'react';
import { useShoppingList } from './context/ShoppingListContext';

export function ShoppingList({ listId = 'default', title = 'Shopping List' }) {
  const { getItems, addItem, toggleItem } = useShoppingList();
  const items = getItems(listId);
  const [value, setValue] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    if (!value.trim()) {
      return;
    }
    addItem(value.trim(), listId);
    setValue('');
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
      <h1>{title}</h1>
      <form onSubmit={onSubmit} style={{ display: 'flex', gap: 8 }}>
        <input
          value={value}
          placeholder="Add an item"
          onChange={(event) => setValue(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul style={{ marginTop: 16 }}>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: 8 }}>
            <label style={{ cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={item.purchased}
                onChange={() => toggleItem(item.id, listId)}
              />
              <span style={{ marginLeft: 8 }}>{item.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
