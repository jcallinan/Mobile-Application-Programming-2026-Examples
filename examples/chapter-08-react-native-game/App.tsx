import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const position = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(position, {
          toValue: 200,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(position, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [position]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rocket Dash</Text>
      <Animated.View style={[styles.player, { transform: [{ translateX: position }] }]} />
      <Text style={styles.subtitle}>Tap to dodge obstacles (coming next).</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f172a',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
  },
  subtitle: {
    color: '#cbd5f5',
    marginTop: 20,
  },
  player: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#38bdf8',
  },
});
