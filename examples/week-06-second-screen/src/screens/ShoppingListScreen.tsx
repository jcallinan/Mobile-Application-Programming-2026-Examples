import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ShoppingItemRow } from '../components/ShoppingItemRow';
import { useShoppingList } from '../context/ShoppingListContext';
import type { ShoppingStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<ShoppingStackParamList, 'ShoppingList'>;

export function ShoppingListScreen({ navigation }: Props) {
  const { items, addItem, togglePurchased, purchasedCount } = useShoppingList();
  const [title, setTitle] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Shopping List</Text>
      <Text style={styles.meta}>
        Purchased {purchasedCount} of {items.length}
      </Text>

      <View style={styles.addRow}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Add item"
          style={styles.input}
          autoCapitalize="words"
        />
        <Pressable
          style={styles.addButton}
          onPress={() => {
            const cleaned = title.trim();
            if (!cleaned) {
              return;
            }
            addItem({ title: cleaned, category: 'Other', quantity: 1 });
            setTitle('');
          }}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {items.map((item) => (
          <ShoppingItemRow
            key={item.id}
            item={item}
            onTogglePurchased={() => togglePurchased(item.id)}
            onOpenDetails={() =>
              navigation.navigate('ShoppingItemDetails', {
                itemId: item.id,
              })
            }
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8fafc',
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
  },
  meta: {
    marginTop: 6,
    marginBottom: 14,
    color: '#475569',
  },
  addRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  input: {
    flex: 1,
    borderColor: '#cbd5e1',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  addButton: {
    backgroundColor: '#2563eb',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  list: {
    paddingBottom: 30,
  },
});
