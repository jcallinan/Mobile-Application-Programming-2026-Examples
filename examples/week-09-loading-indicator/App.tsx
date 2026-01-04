import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

type Update = {
  id: string;
  message: string;
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [updates, setUpdates] = useState<Update[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUpdates([
        { id: '1', message: 'Week 9 lab released.' },
        { id: '2', message: 'Office hours updated.' },
      ]);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Announcements</Text>
      {loading ? (
        <View style={styles.loadingRow}>
          <ActivityIndicator size="small" color="#2563eb" />
          <Text style={styles.loadingText}>Loading updates...</Text>
        </View>
      ) : (
        updates.map((update) => (
          <View key={update.id} style={styles.card}>
            <Text>{update.message}</Text>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    color: '#475569',
  },
  card: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
  },
});
