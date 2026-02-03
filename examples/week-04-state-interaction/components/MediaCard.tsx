import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { MediaItem } from '../types';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#141422',
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2b2b3a',
  },
  cardTitle: {
    color: '#f5f4ff',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    color: '#93c5fd',
    marginTop: 4,
  },
  cardNotes: {
    color: '#cfcfe6',
    marginTop: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  badge: {
    backgroundColor: '#2b2b3a',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#d6d5f1',
    fontSize: 12,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  star: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2b2b3a',
    backgroundColor: '#12121c',
  },
  starActive: {
    backgroundColor: '#f59e0b',
    borderColor: '#f59e0b',
  },
  starText: {
    color: '#f5f4ff',
    fontWeight: '600',
  },
  favoriteButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#1f2937',
    borderRadius: 8,
  },
  favoriteActive: {
    backgroundColor: '#f59e0b',
  },
  favoriteText: {
    color: '#fff',
    fontWeight: '600',
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#ef4444',
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

type MediaCardProps = {
  item: MediaItem;
  onDelete: (id: number) => void;
  onToggleFavorite: (item: MediaItem) => void;
  onUpdateRating: (item: MediaItem, rating: number) => void;
};

export default function MediaCard({
  item,
  onDelete,
  onToggleFavorite,
  onUpdateRating,
}: MediaCardProps) {
  const openLink = async () => {
    await Linking.openURL(item.url);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.link} onPress={openLink}>
        {item.url}
      </Text>
      <Text style={styles.cardNotes}>{item.notes || 'No notes yet.'}</Text>
      <View style={styles.actionRow}>
        {[1, 2, 3, 4, 5].map((value) => {
          const isActive = item.rating >= value;
          return (
            <TouchableOpacity
              key={value}
              style={[styles.star, isActive && styles.starActive]}
              onPress={() => onUpdateRating(item, value)}
            >
              <Text style={styles.starText}>{isActive ? '★' : '☆'}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.cardFooter}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.category}</Text>
        </View>
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.favoriteButton, item.favorite ? styles.favoriteActive : null]}
            onPress={() => onToggleFavorite(item)}
          >
            <Text style={styles.favoriteText}>{item.favorite ? '★ Favorite' : '☆ Favorite'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item.id)}>
            <Text style={styles.deleteButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
