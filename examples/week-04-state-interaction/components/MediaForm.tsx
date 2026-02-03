import { useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import type { NewMediaItem } from '../types';

const DEFAULT_CATEGORY = 'General';
const DEFAULT_RATING = 3;

const styles = StyleSheet.create({
  form: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  label: {
    color: '#c3c2da',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  input: {
    backgroundColor: '#1b1b29',
    color: '#f5f4ff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2b2b3a',
  },
  textArea: {
    minHeight: 72,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  ratingButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2b2b3a',
    backgroundColor: '#12121c',
  },
  ratingButtonActive: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  ratingText: {
    color: '#cfcfe6',
    fontWeight: '600',
  },
  ratingTextActive: {
    color: '#fff',
  },
  favoriteButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2b2b3a',
    backgroundColor: '#12121c',
  },
  favoriteButtonActive: {
    backgroundColor: '#f59e0b',
    borderColor: '#f59e0b',
  },
  favoriteText: {
    color: '#f5f4ff',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: '600',
  },
});

type MediaFormProps = {
  onSubmit: (item: NewMediaItem) => void;
};

export default function MediaForm({ onSubmit }: MediaFormProps) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState(DEFAULT_CATEGORY);
  const [notes, setNotes] = useState('');
  const [rating, setRating] = useState(DEFAULT_RATING);
  const [favorite, setFavorite] = useState(false);

  const ratingOptions = useMemo(() => [1, 2, 3, 4, 5], []);

  const handleSubmit = () => {
    onSubmit({
      title: title.trim(),
      url: url.trim(),
      category: category.trim() || DEFAULT_CATEGORY,
      notes: notes.trim(),
      rating,
      favorite: favorite ? 1 : 0,
    });
    setTitle('');
    setUrl('');
    setCategory(DEFAULT_CATEGORY);
    setNotes('');
    setRating(DEFAULT_RATING);
    setFavorite(false);
  };

  return (
    <View style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          placeholder="Lavish synthwave playlist"
          placeholderTextColor="#6f6f86"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
      </View>
      <View>
        <Text style={styles.label}>Media URL</Text>
        <TextInput
          placeholder="https://youtu.be/..."
          placeholderTextColor="#6f6f86"
          style={styles.input}
          value={url}
          onChangeText={setUrl}
          autoCapitalize="none"
        />
      </View>
      <View>
        <Text style={styles.label}>Category</Text>
        <TextInput
          placeholder="Synthwave"
          placeholderTextColor="#6f6f86"
          style={styles.input}
          value={category}
          onChangeText={setCategory}
        />
      </View>
      <View>
        <Text style={styles.label}>Notes</Text>
        <TextInput
          placeholder="Why did you save this?"
          placeholderTextColor="#6f6f86"
          style={[styles.input, styles.textArea]}
          value={notes}
          onChangeText={setNotes}
          multiline
        />
      </View>
      <View>
        <Text style={styles.label}>Rating</Text>
        <View style={styles.row}>
          {ratingOptions.map((value) => {
            const isActive = rating === value;
            return (
              <TouchableOpacity
                key={value}
                onPress={() => setRating(value)}
                style={[styles.ratingButton, isActive && styles.ratingButtonActive]}
              >
                <Text style={[styles.ratingText, isActive && styles.ratingTextActive]}>
                  {value}★
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View>
        <Text style={styles.label}>Favorite</Text>
        <TouchableOpacity
          onPress={() => setFavorite((prev) => !prev)}
          style={[styles.favoriteButton, favorite && styles.favoriteButtonActive]}
        >
          <Text style={styles.favoriteText}>{favorite ? 'Favorited' : 'Mark Favorite'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Add to Encyclopedia</Text>
      </TouchableOpacity>
    </View>
  );
}
