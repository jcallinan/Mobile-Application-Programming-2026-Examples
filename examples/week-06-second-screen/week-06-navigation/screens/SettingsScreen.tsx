import { StyleSheet, Switch, Text, View } from 'react-native';
import { useState } from 'react';

export function SettingsScreen() {
  const [showPurchasedFirst, setShowPurchasedFirst] = useState(false);
  const [compactMode, setCompactMode] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>
      <Text style={styles.description}>
        This screen exists to demonstrate a third tab and realistic app navigation structure.
      </Text>

      <View style={styles.settingRow}>
        <Text style={styles.label}>Show purchased items first</Text>
        <Switch value={showPurchasedFirst} onValueChange={setShowPurchasedFirst} />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.label}>Compact list mode</Text>
        <Switch value={compactMode} onValueChange={setCompactMode} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 20,
    gap: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
  },
  description: {
    color: '#475569',
    lineHeight: 22,
  },
  settingRow: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    borderColor: '#e2e8f0',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: '#0f172a',
  },
});
