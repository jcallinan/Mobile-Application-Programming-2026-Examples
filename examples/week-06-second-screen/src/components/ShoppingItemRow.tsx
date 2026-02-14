import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { ShoppingItem } from '../context/ShoppingListContext';

type Props = {
  item: ShoppingItem;
  onTogglePurchased: () => void;
  onOpenDetails: () => void;
};

export function ShoppingItemRow({ item, onTogglePurchased, onOpenDetails }: Props) {
  return (
    <Pressable onPress={onOpenDetails} style={styles.card}>
      <View style={styles.titleRow}>
        <Text style={[styles.title, item.purchased && styles.purchased]}>{item.title}</Text>
        <Text style={styles.badge}>{item.category}</Text>
      </View>

      <Text style={styles.subtitle}>Quantity: {item.quantity}</Text>

      <Pressable onPress={onTogglePurchased} style={styles.toggleButton}>
        <Text style={styles.toggleButtonText}>
          {item.purchased ? 'Mark as unpurchased' : 'Mark as purchased'}
        </Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 8,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  purchased: {
    textDecorationLine: 'line-through',
    color: '#64748b',
  },
  subtitle: {
    color: '#475569',
    fontSize: 14,
  },
  badge: {
    backgroundColor: '#dbeafe',
    color: '#1e3a8a',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    fontSize: 12,
    overflow: 'hidden',
  },
  toggleButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#2563eb',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  toggleButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});
