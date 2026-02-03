import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 8,
    gap: 8,
  },
  input: {
    backgroundColor: '#12121c',
    color: '#f5f4ff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2b2b3a',
  },
  toggle: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#1f2937',
  },
  toggleActive: {
    backgroundColor: '#f59e0b',
  },
  toggleText: {
    color: '#fff',
    fontWeight: '600',
  },
});

type FilterBarProps = {
  filter: string;
  onChangeFilter: (value: string) => void;
  showFavoritesOnly: boolean;
  onToggleFavorites: () => void;
};

export default function FilterBar({
  filter,
  onChangeFilter,
  showFavoritesOnly,
  onToggleFavorites,
}: FilterBarProps) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Filter by title, category, or notes"
        placeholderTextColor="#6f6f86"
        style={styles.input}
        value={filter}
        onChangeText={onChangeFilter}
      />
      <TouchableOpacity
        style={[styles.toggle, showFavoritesOnly && styles.toggleActive]}
        onPress={onToggleFavorites}
      >
        <Text style={styles.toggleText}>
          {showFavoritesOnly ? 'Showing Favorites' : 'Show Favorites Only'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
