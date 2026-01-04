import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.name}>Jordan Lee</Text>
        <Text style={styles.subtitle}>Mobile Developer</Text>
        <Text style={styles.body}>Building user-friendly experiences for students.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111827',
    padding: 20,
  },
  card: {
    backgroundColor: '#1f2937',
    padding: 24,
    borderRadius: 16,
    width: '100%',
  },
  name: {
    color: '#f9fafb',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    color: '#93c5fd',
    marginBottom: 12,
  },
  body: {
    color: '#e5e7eb',
    lineHeight: 20,
  },
});
