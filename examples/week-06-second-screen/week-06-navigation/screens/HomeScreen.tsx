import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Week 6: Modern Navigation</Text>
      <Text style={styles.body}>
        This example combines tab navigation, nested stacks, typed routes, and modal
        presentation.
      </Text>

      <Pressable style={styles.button} onPress={() => navigation.navigate('AboutModal')}>
        <Text style={styles.buttonText}>Open About Modal</Text>
      </Pressable>

      <Text style={styles.tip}>
        Tip: Use deep links like <Text style={styles.code}>myapp://shopping</Text> when testing.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    gap: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
  },
  body: {
    color: '#334155',
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#0ea5e9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
  },
  tip: {
    color: '#475569',
  },
  code: {
    fontFamily: 'monospace',
  },
});
