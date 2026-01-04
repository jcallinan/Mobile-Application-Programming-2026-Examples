import { FlatList, StyleSheet, Text, View } from 'react-native';

const sessions = [
  { id: '1', title: 'React Review', time: 'Mon 4pm' },
  { id: '2', title: 'Expo Workshop', time: 'Wed 1pm' },
  { id: '3', title: 'Project Help', time: 'Fri 10am' },
];

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Study Sessions</Text>
      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardTime}>{item.time}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f1f5f9',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardTime: {
    color: '#64748b',
    marginTop: 4,
  },
});
