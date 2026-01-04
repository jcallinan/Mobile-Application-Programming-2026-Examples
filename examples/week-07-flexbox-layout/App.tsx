import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flexbox Dashboard</Text>
      <View style={styles.row}>
        <View style={styles.cardLarge}>
          <Text style={styles.cardLabel}>Weekly Focus</Text>
          <Text style={styles.cardValue}>12 hrs</Text>
        </View>
        <View style={styles.cardSmall}>
          <Text style={styles.cardLabel}>Tasks</Text>
          <Text style={styles.cardValue}>8</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cardSmall}>
          <Text style={styles.cardLabel}>Labs</Text>
          <Text style={styles.cardValue}>3</Text>
        </View>
        <View style={styles.cardLarge}>
          <Text style={styles.cardLabel}>Next Deadline</Text>
          <Text style={styles.cardValue}>Friday</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#0f172a',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  cardLarge: {
    flex: 2,
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
  },
  cardSmall: {
    flex: 1,
    backgroundColor: '#334155',
    padding: 16,
    borderRadius: 12,
  },
  cardLabel: {
    color: '#cbd5f5',
    marginBottom: 8,
  },
  cardValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
