import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export function LoginExampleScreen() {
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    setError('');
    setToken('');

    try {
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = (await response.json()) as { token?: string; error?: string };

      if (!response.ok || !data.token) {
        setError(data.error ?? 'Login failed.');
        return;
      }

      setToken(data.token);
    } catch {
      setError('Network error while contacting ReqRes.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login API Example (ReqRes)</Text>
      <Text style={styles.help}>Use default demo credentials or try invalid values.</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#64748b"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#64748b"
      />

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      {loading ? <ActivityIndicator color="#60a5fa" /> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {token ? <Text style={styles.token}>Token: {token}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 10 },
  heading: { color: '#f8fafc', fontSize: 18, fontWeight: '700' },
  help: { color: '#94a3b8' },
  input: {
    minHeight: 44,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#1e293b',
    color: '#fff',
  },
  button: {
    minHeight: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2563eb',
  },
  buttonText: { color: '#fff', fontWeight: '700' },
  error: { color: '#fca5a5' },
  token: {
    color: '#a7f3d0',
    backgroundColor: '#064e3b',
    padding: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
