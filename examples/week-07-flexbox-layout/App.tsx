import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { ExampleTabBar } from './src/components/ExampleTabBar';
import { ScreenContainer } from './src/components/ScreenContainer';
import { SectionTitle } from './src/components/SectionTitle';
import { BookDetailScreen } from './src/screens/BookDetailScreen';
import { BookSearchScreen } from './src/screens/BookSearchScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { LoginExampleScreen } from './src/screens/LoginExampleScreen';
import type { Book, ExampleRoute } from './src/types';

export default function App() {
  const [route, setRoute] = useState<ExampleRoute>('dashboard');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  function openRoute(nextRoute: ExampleRoute) {
    setRoute(nextRoute);
    setSelectedBook(null);
  }

  return (
    <ScreenContainer>
      <SectionTitle
        title="Week 7 · Flexbox Example App"
        subtitle="Use the tabs below to switch between complete examples: dashboard, book search/detail, and login API demo."
      />

      <ExampleTabBar current={route} onSelect={openRoute} />

      <View style={styles.content}>{route === 'dashboard' ? <DashboardScreen /> : null}</View>

      <View style={styles.content}>
        {route === 'bookSearch' && selectedBook === null ? (
          <BookSearchScreen onSelectBook={setSelectedBook} />
        ) : null}
        {route === 'bookSearch' && selectedBook ? (
          <BookDetailScreen book={selectedBook} onBack={() => setSelectedBook(null)} />
        ) : null}
      </View>

      <View style={styles.content}>{route === 'login' ? <LoginExampleScreen /> : null}</View>
      <StatusBar style="light" />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#0b1220',
    borderRadius: 14,
    padding: 12,
  },
});
