import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { ExampleRoute } from '../types';

const tabs: { route: ExampleRoute; label: string }[] = [
  { route: 'dashboard', label: 'Dashboard' },
  { route: 'bookSearch', label: 'Book Search' },
  { route: 'login', label: 'Login' },
];

type Props = {
  current: ExampleRoute;
  onSelect: (route: ExampleRoute) => void;
};

export function ExampleTabBar({ current, onSelect }: Props) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const active = tab.route === current;
        return (
          <Pressable
            key={tab.route}
            onPress={() => onSelect(tab.route)}
            style={[styles.tab, active && styles.tabActive]}
          >
            <Text style={[styles.text, active && styles.textActive]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: '#1e293b',
  },
  tabActive: {
    backgroundColor: '#2563eb',
  },
  text: {
    color: '#cbd5e1',
    fontWeight: '600',
  },
  textActive: {
    color: '#ffffff',
  },
});
