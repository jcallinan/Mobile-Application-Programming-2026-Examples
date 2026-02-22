import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Book } from '../types';

type Props = {
  book: Book;
  onPress: (book: Book) => void;
};

export function BookListItem({ book, onPress }: Props) {
  return (
    <Pressable style={styles.item} onPress={() => onPress(book)}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.meta}>{book.author}</Text>
      </View>
      {book.year ? <Text style={styles.year}>{book.year}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#1e293b',
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  textContainer: {
    flex: 1,
    gap: 3,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  meta: {
    color: '#94a3b8',
  },
  year: {
    color: '#bfdbfe',
    fontWeight: '700',
  },
});
