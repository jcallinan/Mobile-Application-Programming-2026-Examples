import { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

const initialPosts = [
  { id: '1', author: 'Jules', body: 'Anyone else learning React Native this week?' },
  { id: '2', author: 'Riya', body: 'Just shipped a new onboarding flow!' },
];

export default function App() {
  const [posts, setPosts] = useState(initialPosts);
  const [message, setMessage] = useState('');

  const submit = () => {
    if (!message.trim()) {
      return;
    }
    setPosts((prev) => [
      { id: String(Date.now()), author: 'You', body: message.trim() },
      ...prev,
    ]);
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Social Feed</Text>
      <View style={styles.composer}>
        <TextInput
          placeholder="Share an update..."
          value={message}
          onChangeText={setMessage}
          onSubmitEditing={submit}
          style={styles.input}
        />
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.author}>{item.author}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 12,
  },
  composer: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 12,
  },
  input: {
    color: '#fff',
  },
  list: {
    paddingVertical: 16,
    gap: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
  },
  author: {
    fontWeight: '700',
    marginBottom: 4,
  },
});
