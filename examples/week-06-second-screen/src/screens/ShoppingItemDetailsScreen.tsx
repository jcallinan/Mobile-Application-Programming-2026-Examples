import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useShoppingList } from '../context/ShoppingListContext';
import type { ShoppingStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<ShoppingStackParamList, 'ShoppingItemDetails'>;

export function ShoppingItemDetailsScreen({ route, navigation }: Props) {
  const { itemId } = route.params;
  const { items, updateNotes, togglePurchased } = useShoppingList();

  const item = useMemo(() => items.find((candidate) => candidate.id === itemId), [items, itemId]);
  const [notesDraft, setNotesDraft] = useState(item?.notes ?? '');

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Item not found</Text>
        <Pressable onPress={() => navigation.goBack()} style={styles.button}>
          <Text style={styles.buttonText}>Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{item.title}</Text>
      <Text style={styles.meta}>Category: {item.category}</Text>
      <Text style={styles.meta}>Quantity: {item.quantity}</Text>

      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={styles.notesInput}
        multiline
        numberOfLines={4}
        value={notesDraft}
        onChangeText={setNotesDraft}
        placeholder="Add shopping notes"
      />

      <View style={styles.actions}>
        <Pressable
          style={styles.button}
          onPress={() => {
            updateNotes(item.id, notesDraft.trim());
            navigation.goBack();
          }}
        >
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.altButton]}
          onPress={() => togglePurchased(item.id)}
        >
          <Text style={styles.buttonText}>
            {item.purchased ? 'Mark Unpurchased' : 'Mark Purchased'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },
  meta: {
    color: '#334155',
    marginBottom: 4,
  },
  label: {
    marginTop: 16,
    marginBottom: 8,
    color: '#0f172a',
    fontWeight: '700',
  },
  notesInput: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    minHeight: 100,
    textAlignVertical: 'top',
    padding: 10,
  },
  actions: {
    marginTop: 16,
    gap: 10,
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    alignSelf: 'flex-start',
  },
  altButton: {
    backgroundColor: '#0ea5e9',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
});
