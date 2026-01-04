import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

function HomeScreen({ onNavigate }: { onNavigate: () => void }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Home Screen</Text>
      <Text style={styles.body}>Welcome! Tap below to view the schedule.</Text>
      <Pressable style={styles.button} onPress={onNavigate}>
        <Text style={styles.buttonText}>Go to Details</Text>
      </Pressable>
    </View>
  );
}

function DetailsScreen({ onBack }: { onBack: () => void }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Details Screen</Text>
      <Text style={styles.body}>Office hours: Tue & Thu, 2pm-4pm.</Text>
      <Pressable style={styles.button} onPress={onBack}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </Pressable>
    </View>
  );
}

export default function App() {
  const [screen, setScreen] = useState<'home' | 'details'>('home');

  return (
    <View style={styles.container}>
      {screen === 'home' ? (
        <HomeScreen onNavigate={() => setScreen('details')} />
      ) : (
        <DetailsScreen onBack={() => setScreen('home')} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 24,
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  body: {
    color: '#475569',
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
