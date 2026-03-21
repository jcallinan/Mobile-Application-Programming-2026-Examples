import { StyleSheet, Text, View } from 'react-native';

type ScreenHeaderProps = {
  count: number;
  averageRating: string;
};

export function ScreenHeader({ count, averageRating }: ScreenHeaderProps) {
  return (
    <View style={styles.headerCard}>
      <View style={styles.headerRow}>
        <View style={styles.headerCopy}>
          <Text style={styles.eyebrow}>Production build demo</Text>
          <Text style={styles.title}>Idea Vault</Text>
          <Text style={styles.subtitle}>
            A polished local-first tracker for evaluating and backing up business ideas.
          </Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Expo</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Saved ideas</Text>
          <Text style={styles.statValue}>{count}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Average rating</Text>
          <Text style={styles.statValue}>{averageRating}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerCard: {
    backgroundColor: '#111827',
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: '#1e293b',
    gap: 18,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  headerCopy: {
    flex: 1,
  },
  eyebrow: {
    color: '#38bdf8',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    color: '#f8fafc',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 4,
  },
  subtitle: {
    color: '#cbd5e1',
    marginTop: 8,
    lineHeight: 20,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#1d4ed8',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    color: '#eff6ff',
    fontSize: 12,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#0f172a',
    borderRadius: 18,
    padding: 16,
  },
  statLabel: {
    color: '#94a3b8',
    fontSize: 13,
  },
  statValue: {
    color: '#f8fafc',
    fontSize: 24,
    fontWeight: '800',
    marginTop: 4,
  },
});
