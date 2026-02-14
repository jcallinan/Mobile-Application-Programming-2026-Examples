import { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useShoppingList } from './context/ShoppingListContext';

export function ShoppingList({ listId = 'default', title = 'Shopping List' }) {
  const { getItems, addItem, toggleItem } = useShoppingList();
  const items = getItems(listId);
  const [value, setValue] = useState('');

  const onSubmit = () => {
    if (!value.trim()) {
      return;
    }

    addItem(value.trim(), listId);
    setValue('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{title}</Text>
      <View style={styles.formRow}>
        <TextInput
          value={value}
          placeholder="Add an item"
          onChangeText={setValue}
          style={styles.input}
          onSubmitEditing={onSubmit}
          returnKeyType="done"
        />
        <Pressable style={styles.addButton} onPress={onSubmit}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => toggleItem(item.id, listId)}
            style={styles.itemRow}
          >
            <Text style={[styles.checkbox, item.purchased && styles.checkboxChecked]}>
              {item.purchased ? '☑' : '☐'}
            </Text>
            <Text style={[styles.itemText, item.purchased && styles.itemTextDone]}>
              {item.label}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d0d7de',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#1f6feb',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  list: {
    paddingTop: 18,
    gap: 10,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    fontSize: 20,
    marginRight: 10,
    color: '#57606a',
  },
  checkboxChecked: {
    color: '#1a7f37',
  },
  itemText: {
    fontSize: 17,
  },
  itemTextDone: {
    textDecorationLine: 'line-through',
    color: '#57606a',
  },
});
