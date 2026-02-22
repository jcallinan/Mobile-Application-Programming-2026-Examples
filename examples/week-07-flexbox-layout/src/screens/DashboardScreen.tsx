import { StyleSheet, Text, View } from 'react-native';

function StatCard({ title, value, wide = false }: { title: string; value: string; wide?: boolean }) {
  return (
    <View style={[styles.card, wide ? styles.wide : styles.narrow]}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardValue}>{value}</Text>
    </View>
  );
}

export function DashboardScreen() {
  return (
    <View style={styles.section}>
      <Text style={styles.header}>Flexbox Dashboard Example</Text>

      <View style={styles.row}>
        <StatCard title="Weekly Focus" value="12 hrs" wide />
        <StatCard title="Tasks" value="8" />
      </View>

      <View style={styles.row}>
        <StatCard title="Labs" value="3" />
        <StatCard title="Next Deadline" value="Friday" wide />
      </View>

      <View style={styles.profileRow}>
        <View style={styles.avatar}><Text style={styles.avatarText}>JS</Text></View>
        <View style={styles.profileInfo}>
          <Text style={styles.name}>Jordan Student</Text>
          <Text style={styles.meta}>React Native · Week 7</Text>
        </View>
        <Text style={styles.badge}>ACTIVE</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: 12 },
  header: { color: '#f8fafc', fontSize: 18, fontWeight: '700' },
  row: { flexDirection: 'row', gap: 10 },
  card: { borderRadius: 12, padding: 14, backgroundColor: '#1e293b' },
  wide: { flex: 2 },
  narrow: { flex: 1 },
  cardTitle: { color: '#94a3b8' },
  cardValue: { color: '#fff', marginTop: 8, fontWeight: '700', fontSize: 18 },
  profileRow: {
    marginTop: 6,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: '#fff', fontWeight: '700' },
  profileInfo: { flex: 1 },
  name: { color: '#fff', fontWeight: '600' },
  meta: { color: '#94a3b8', marginTop: 2 },
  badge: {
    color: '#bfdbfe',
    borderColor: '#3b82f6',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    overflow: 'hidden',
    fontSize: 12,
    fontWeight: '700',
  },
});
