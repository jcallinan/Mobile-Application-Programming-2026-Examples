import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import type { Book, BookDetail } from '../types';

type Props = {
  book: Book;
  onBack: () => void;
};

function readDescription(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object' && 'value' in value) {
    const nested = (value as { value?: unknown }).value;
    return typeof nested === 'string' ? nested : 'No description available.';
  }
  return 'No description available.';
}

export function BookDetailScreen({ book, onBack }: Props) {
  const [detail, setDetail] = useState<BookDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDetail() {
      setLoading(true);
      try {
        const response = await fetch(`https://openlibrary.org${book.key}.json`);
        const data = (await response.json()) as { description?: unknown; subjects?: string[] };
        setDetail({
          description: readDescription(data.description),
          subjects: data.subjects?.slice(0, 6) ?? [],
        });
      } catch {
        setDetail({
          description: 'Failed to load details.',
          subjects: [],
        });
      } finally {
        setLoading(false);
      }
    }

    loadDetail();
  }, [book.key]);

  return (
    <View style={styles.container}>
      <Pressable onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>← Back to search</Text>
      </Pressable>
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>{book.author}</Text>

      {loading ? (
        <ActivityIndicator color="#60a5fa" />
      ) : (
        <View style={styles.card}>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.description}>{detail?.description}</Text>

          <Text style={styles.label}>Subjects</Text>
          <View style={styles.subjectWrap}>
            {detail?.subjects.length ? (
              detail.subjects.map((subject) => (
                <Text key={subject} style={styles.subjectChip}>
                  {subject}
                </Text>
              ))
            ) : (
              <Text style={styles.noData}>No subject tags.</Text>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 12 },
  backButton: { alignSelf: 'flex-start' },
  backText: { color: '#93c5fd', fontWeight: '600' },
  title: { color: '#fff', fontSize: 22, fontWeight: '700' },
  author: { color: '#94a3b8' },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 14,
    gap: 8,
  },
  label: { color: '#bfdbfe', fontWeight: '700', marginTop: 4 },
  description: { color: '#e2e8f0', lineHeight: 20 },
  subjectWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  subjectChip: {
    backgroundColor: '#334155',
    color: '#e2e8f0',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    overflow: 'hidden',
  },
  noData: { color: '#94a3b8' },
});
