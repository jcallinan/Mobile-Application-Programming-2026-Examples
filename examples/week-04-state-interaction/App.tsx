import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [isJoined, setIsJoined] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Workshop RSVP</Text>
      <Text style={styles.status}>{isJoined ? 'You are attending.' : 'Tap to join.'}</Text>
      <Pressable
        style={[styles.button, isJoined && styles.buttonActive]}
        onPress={() => setIsJoined((value) => !value)}
      >
        <Text style={styles.buttonText}>{isJoined ? 'Leave' : 'Join'}</Text>
      </Pressable>
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
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#334155',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonActive: {
    backgroundColor: '#38bdf8',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
