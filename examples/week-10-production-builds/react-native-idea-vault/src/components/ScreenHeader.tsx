import { StyleSheet, Text, View } from 'react-native';

type ScreenHeaderProps = {
  count: number;
  topRated: number;
};

export function ScreenHeader({ count, topRated }: ScreenHeaderProps) {
  return (
    <View style={styles.banner}>
      <View style={styles.copy}>
        <Text style={styles.kicker}>Production-ready workflow</Text>
        <Text style={styles.title}>Idea Lab</Text>
        <Text style={styles.subtitle}>
          A structured local database for evaluating product ideas, experiments, and release backups.
        </Text>
      </View>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>React Native</Text>
      </View>

      <View style={styles.scoreboard}>
        <View style={[styles.scoreTile, styles.blueTile]}>
          <Text style={styles.scoreLabel}>Saved ideas</Text>
          <Text style={styles.scoreValue}>{count}</Text>
        </View>
        <View style={[styles.scoreTile, styles.pinkTile]}>
          <Text style={styles.scoreLabel}>Top-rated</Text>
          <Text style={styles.scoreValue}>{topRated}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#fff7ed',
    borderRadius: 28,
    padding: 20,
    gap: 16,
  },
  copy: {
    gap: 6,
  },
  kicker: {
    color: '#c2410c',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    color: '#7c2d12',
    fontSize: 30,
    fontWeight: '800',
  },
  subtitle: {
    color: '#9a3412',
    lineHeight: 20,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#111827',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    color: '#f8fafc',
    fontSize: 12,
    fontWeight: '700',
  },
  scoreboard: {
    flexDirection: 'row',
    gap: 12,
  },
  scoreTile: {
    flex: 1,
    borderRadius: 24,
    padding: 18,
  },
  blueTile: {
    backgroundColor: '#dbeafe',
  },
  pinkTile: {
    backgroundColor: '#fce7f3',
  },
  scoreLabel: {
    color: '#334155',
    fontWeight: '600',
  },
  scoreValue: {
    color: '#0f172a',
    fontSize: 26,
    fontWeight: '800',
    marginTop: 8,
  },
});
