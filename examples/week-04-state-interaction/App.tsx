import { useEffect, useMemo, useState } from 'react';
import { Alert, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import FilterBar from './components/FilterBar';
import MediaForm from './components/MediaForm';
import MediaList from './components/MediaList';
import type { MediaItem, NewMediaItem } from './types';

const db = Platform.OS === 'web' ? null : SQLite.openDatabase('lux_media.db');
const WEB_STORAGE_KEY = 'lux-media-encyclopedia-items';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0b12',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    backgroundColor: '#12121c',
    borderBottomWidth: 1,
    borderBottomColor: '#2b2b3a',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#f5f4ff',
  },
  subtitle: {
    marginTop: 6,
    color: '#b2b1c7',
  },
});

const migrateColumns = (columns: { statement: string }[]) => {
  db.transaction((tx) => {
    columns.forEach((column) => {
      tx.executeSql(
        column.statement,
        [],
        undefined,
        () => true
      );
    });
  });
};

export default function App() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [filter, setFilter] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'web') {
      const storedItems = localStorage.getItem(WEB_STORAGE_KEY);
      if (storedItems) {
        try {
          const parsed = JSON.parse(storedItems) as MediaItem[];
          setItems(parsed);
        } catch (error) {
          console.warn('Failed to parse stored items', error);
        }
      }
      return;
    }

    db?.transaction(
      (tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS media_items (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            url TEXT NOT NULL,
            category TEXT NOT NULL,
            notes TEXT NOT NULL,
            created_at TEXT NOT NULL,
            rating INTEGER NOT NULL DEFAULT 3,
            favorite INTEGER NOT NULL DEFAULT 0
          );`
        );
      },
      undefined,
      () => {
        migrateColumns([
          {
            statement: 'ALTER TABLE media_items ADD COLUMN rating INTEGER NOT NULL DEFAULT 3;',
          },
          {
            statement: 'ALTER TABLE media_items ADD COLUMN favorite INTEGER NOT NULL DEFAULT 0;',
          },
        ]);
        fetchItems();
      }
    );
  }, []);

  const fetchItems = () => {
    if (!db) {
      return;
    }
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM media_items ORDER BY created_at DESC;', [], (_, { rows }) => {
        setItems(rows._array as MediaItem[]);
      });
    });
  };

  const persistWebItems = (nextItems: MediaItem[]) => {
    setItems(nextItems);
    localStorage.setItem(WEB_STORAGE_KEY, JSON.stringify(nextItems));
  };

  const handleAdd = (item: NewMediaItem) => {
    if (!item.title || !item.url) {
      Alert.alert('Missing details', 'Please add both a title and a link.');
      return;
    }

    const now = new Date().toISOString();
    if (!db) {
      const nextItems = [
        {
          id: Date.now(),
          created_at: now,
          ...item,
        },
        ...items,
      ];
      persistWebItems(nextItems);
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO media_items (title, url, category, notes, created_at, rating, favorite) VALUES (?, ?, ?, ?, ?, ?, ?);',
        [item.title, item.url, item.category, item.notes, now, item.rating, item.favorite],
        () => {
          fetchItems();
        }
      );
    });
  };

  const handleDelete = (id: number) => {
    if (!db) {
      persistWebItems(items.filter((item) => item.id !== id));
      return;
    }
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM media_items WHERE id = ?;', [id], () => {
        fetchItems();
      });
    });
  };

  const handleToggleFavorite = (item: MediaItem) => {
    const nextValue = item.favorite ? 0 : 1;
    if (!db) {
      persistWebItems(
        items.map((entry) => (entry.id === item.id ? { ...entry, favorite: nextValue } : entry))
      );
      return;
    }
    db.transaction((tx) => {
      tx.executeSql('UPDATE media_items SET favorite = ? WHERE id = ?;', [nextValue, item.id], () => {
        fetchItems();
      });
    });
  };

  const handleUpdateRating = (item: MediaItem, rating: number) => {
    if (!db) {
      persistWebItems(
        items.map((entry) => (entry.id === item.id ? { ...entry, rating } : entry))
      );
      return;
    }
    db.transaction((tx) => {
      tx.executeSql('UPDATE media_items SET rating = ? WHERE id = ?;', [rating, item.id], () => {
        fetchItems();
      });
    });
  };

  const filteredItems = useMemo(() => {
    const lowered = filter.trim().toLowerCase();
    return items.filter((item) => {
      if (showFavoritesOnly && !item.favorite) {
        return false;
      }
      if (!lowered) {
        return true;
      }
      return (
        item.title.toLowerCase().includes(lowered) ||
        item.category.toLowerCase().includes(lowered) ||
        item.notes.toLowerCase().includes(lowered)
      );
    });
  }, [filter, items, showFavoritesOnly]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Lux Media Encyclopedia</Text>
        <Text style={styles.subtitle}>
          Capture links, notes, ratings, and favorites. SQLite keeps it all offline-ready.
        </Text>
      </View>
      <MediaForm onSubmit={handleAdd} />
      <FilterBar
        filter={filter}
        onChangeFilter={setFilter}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavorites={() => setShowFavoritesOnly((prev) => !prev)}
      />
      <MediaList
        items={filteredItems}
        onDelete={handleDelete}
        onToggleFavorite={handleToggleFavorite}
        onUpdateRating={handleUpdateRating}
      />
    </SafeAreaView>
  );
}
