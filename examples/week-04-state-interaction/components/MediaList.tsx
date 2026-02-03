import { FlatList, StyleSheet, Text, View } from 'react-native';
import type { MediaItem } from '../types';
import MediaCard from './MediaCard';

const styles = StyleSheet.create({
  listHeader: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  listHeaderText: {
    color: '#c3c2da',
    fontSize: 14,
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    color: '#a6a5bf',
    textAlign: 'center',
  },
});

type MediaListProps = {
  items: MediaItem[];
  onDelete: (id: number) => void;
  onToggleFavorite: (item: MediaItem) => void;
  onUpdateRating: (item: MediaItem, rating: number) => void;
};

export default function MediaList({
  items,
  onDelete,
  onToggleFavorite,
  onUpdateRating,
}: MediaListProps) {
  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={
        <View style={styles.listHeader}>
          <Text style={styles.listHeaderText}>
            {items.length} saved piece{items.length === 1 ? '' : 's'}
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <MediaCard
          item={item}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
          onUpdateRating={onUpdateRating}
        />
      )}
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>
            Your encyclopedia is empty. Add a link above to start curating.
          </Text>
        </View>
      }
    />
  );
}
