import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [isJoined, setIsJoined] = useState(false);
  const [questions, setQuestions] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Workshop RSVP</Text>
      <Text style={styles.status}>{isJoined ? 'You are attending.' : 'Tap to join.'}</Text>
      <Text style={styles.counter}>Questions asked: {questions}</Text>
      <Pressable
        style={[styles.button, isJoined && styles.buttonActive]}
        onPress={() => setIsJoined((value) => !value)}
      >
        <Text style={styles.buttonText}>{isJoined ? 'Leave' : 'Join'}</Text>
      </Pressable>
      <View style={styles.row}>
        <Pressable
          style={[styles.button, styles.buttonSecondary]}
          onPress={() => setQuestions((value) => value + 1)}
        >
          <Text style={styles.buttonText}>Add Question</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonSecondary]}
          onPress={() => setQuestions(0)}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f172a',
    padding: 24,
  },
  heading: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 12,
  },
  status: {
    color: '#cbd5f5',
    marginBottom: 8,
  },
  counter: {
    color: '#e2e8f0',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#334155',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  buttonActive: {
    backgroundColor: '#38bdf8',
  },
  buttonSecondary: {
    backgroundColor: '#1e293b',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
