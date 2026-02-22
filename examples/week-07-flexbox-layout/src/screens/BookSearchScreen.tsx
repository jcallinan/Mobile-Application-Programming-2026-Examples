import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { BookListItem } from '../components/BookListItem';
import type { Book } from '../types';

type Props = {
  onSelectBook: (book: Book) => void;
};

type SearchDoc = {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
};

export function BookSearchScreen({ onSelectBook }: Props) {
  const [query, setQuery] = useState('react native');
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function searchBooks() {
    if (!query.trim()) {
      setError('Please enter a keyword.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query.trim())}&limit=10`,
      );
      const data = (await response.json()) as { docs?: SearchDoc[] };
      const books: Book[] = (data.docs ?? []).map((doc) => ({
        key: doc.key,
        title: doc.title,
        author: doc.author_name?.[0] ?? 'Unknown author',
        coverId: doc.cover_i,
        year: doc.first_publish_year,
      }));
      setResults(books);
    } catch {
      setError('Search failed. Check your internet connection.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Book Search Example</Text>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder="Search books"
          placeholderTextColor="#64748b"
        />
        <Pressable style={styles.button} onPress={searchBooks}>
          <Text style={styles.buttonText}>Search</Text>
        </Pressable>
      </View>

      {loading ? <ActivityIndicator color="#60a5fa" /> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.list}>
        {results.map((book) => (
          <BookListItem key={book.key} book={book} onPress={onSelectBook} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 12 },
  heading: { color: '#f8fafc', fontSize: 18, fontWeight: '700' },
  searchRow: { flexDirection: 'row', gap: 8 },
  input: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 10,
    paddingHorizontal: 12,
    color: '#fff',
    minHeight: 44,
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 10,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '700' },
  error: { color: '#fca5a5' },
  list: { gap: 8 },
});
