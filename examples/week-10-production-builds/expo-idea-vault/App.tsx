import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as SQLite from 'expo-sqlite';
import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type IdeaRecord = {
  id: number;
  title: string;
  notes: string;
  rating: number;
  market: string;
  revenueModel: string;
  nextStep: string;
  contact: string;
  updatedAt: string;
};

type DraftIdea = Omit<IdeaRecord, 'id' | 'updatedAt'>;

const database = SQLite.openDatabaseSync('idea-vault.db');

const emptyDraft: DraftIdea = {
  title: '',
  notes: '',
  rating: 3,
  market: '',
  revenueModel: '',
  nextStep: '',
  contact: '',
};

const seedIdeas: DraftIdea[] = [
  {
    title: 'Pop-up coffee cart for campus events',
    notes: 'Test demand during orientation and sports games.',
    rating: 4,
    market: 'College students',
    revenueModel: 'Per drink sales + event catering',
    nextStep: 'Interview student organizations',
    contact: 'events@campus.test',
  },
  {
    title: 'Local maker subscription box',
    notes: 'Bundle handmade products from nearby creators each month.',
    rating: 5,
    market: 'Gift buyers',
    revenueModel: 'Monthly subscription',
    nextStep: 'Validate price range with 10 shoppers',
    contact: 'makers@example.test',
  },
];

function createSchema() {
  database.execSync(`
    CREATE TABLE IF NOT EXISTS ideas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      notes TEXT NOT NULL,
      rating INTEGER NOT NULL,
      market TEXT NOT NULL,
      revenueModel TEXT NOT NULL,
      nextStep TEXT NOT NULL,
      contact TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );
  `);

  const row = database.getFirstSync<{ count: number }>('SELECT COUNT(*) as count FROM ideas');
  if ((row?.count ?? 0) === 0) {
    for (const idea of seedIdeas) {
      saveIdea(idea);
    }
  }
}

function listIdeas(): IdeaRecord[] {
  return database.getAllSync<IdeaRecord>('SELECT * FROM ideas ORDER BY rating DESC, updatedAt DESC');
}

function saveIdea(idea: DraftIdea) {
  database.runSync(
    `INSERT INTO ideas (title, notes, rating, market, revenueModel, nextStep, contact, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)` ,
    [
      idea.title.trim(),
      idea.notes.trim(),
      idea.rating,
      idea.market.trim(),
      idea.revenueModel.trim(),
      idea.nextStep.trim(),
      idea.contact.trim(),
      new Date().toISOString(),
    ],
  );
}

function deleteIdea(id: number) {
  database.runSync('DELETE FROM ideas WHERE id = ?', [id]);
}

function replaceIdeas(ideas: DraftIdea[]) {
  database.withTransactionSync(() => {
    database.execSync('DELETE FROM ideas');
    ideas.forEach((idea) => saveIdea(idea));
  });
}

export default function App() {
  const [draft, setDraft] = useState<DraftIdea>(emptyDraft);
  const [ideas, setIdeas] = useState<IdeaRecord[]>([]);

  useEffect(() => {
    createSchema();
    refreshIdeas();
  }, []);

  const averageRating = useMemo(() => {
    if (ideas.length === 0) {
      return 0;
    }
    return ideas.reduce((sum, idea) => sum + idea.rating, 0) / ideas.length;
  }, [ideas]);

  const refreshIdeas = () => {
    setIdeas(listIdeas());
  };

  const submitIdea = () => {
    if (!draft.title.trim() || !draft.notes.trim()) {
      Alert.alert('Missing info', 'Add at least a title and some notes.');
      return;
    }

    saveIdea(draft);
    setDraft(emptyDraft);
    refreshIdeas();
  };

  const exportDatabase = async () => {
    const payload = JSON.stringify(
      ideas.map(({ id: _id, updatedAt: _updatedAt, ...idea }) => idea),
      null,
      2,
    );

    const directory = FileSystem.cacheDirectory;
    if (!directory) {
      Alert.alert('Export failed', 'No writable cache directory was available.');
      return;
    }

    const fileUri = `${directory}expo-idea-vault-export.json`;
    await FileSystem.writeAsStringAsync(fileUri, payload, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
    } else {
      Alert.alert('Export ready', `Saved to ${fileUri}`);
    }
  };

  const importDatabase = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      type: 'application/json',
    });

    if (result.canceled) {
      return;
    }

    const file = result.assets[0];
    const contents = await FileSystem.readAsStringAsync(file.uri, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    const parsed = JSON.parse(contents) as DraftIdea[];

    replaceIdeas(parsed);
    refreshIdeas();
    Alert.alert('Import complete', `Loaded ${parsed.length} ideas from backup.`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerCard}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.eyebrow}>Production build demo</Text>
              <Text style={styles.title}>Idea Vault</Text>
              <Text style={styles.subtitle}>
                Track business ideas offline, then import/export the local database.
              </Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Expo</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Ideas</Text>
              <Text style={styles.statValue}>{ideas.length}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Average rating</Text>
              <Text style={styles.statValue}>{averageRating.toFixed(1)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.panel}>
          <Text style={styles.sectionTitle}>Add a new idea</Text>
          <TextInput
            placeholder="Idea title"
            placeholderTextColor="#94a3b8"
            style={styles.input}
            value={draft.title}
            onChangeText={(title) => setDraft((current) => ({ ...current, title }))}
          />
          <TextInput
            placeholder="Notes"
            placeholderTextColor="#94a3b8"
            multiline
            style={[styles.input, styles.textArea]}
            value={draft.notes}
            onChangeText={(notes) => setDraft((current) => ({ ...current, notes }))}
          />
          <TextInput
            placeholder="Target market"
            placeholderTextColor="#94a3b8"
            style={styles.input}
            value={draft.market}
            onChangeText={(market) => setDraft((current) => ({ ...current, market }))}
          />
          <TextInput
            placeholder="Revenue model"
            placeholderTextColor="#94a3b8"
            style={styles.input}
            value={draft.revenueModel}
            onChangeText={(revenueModel) =>
              setDraft((current) => ({ ...current, revenueModel }))
            }
          />
          <TextInput
            placeholder="Next validation step"
            placeholderTextColor="#94a3b8"
            style={styles.input}
            value={draft.nextStep}
            onChangeText={(nextStep) => setDraft((current) => ({ ...current, nextStep }))}
          />
          <TextInput
            placeholder="Best contact or lead"
            placeholderTextColor="#94a3b8"
            style={styles.input}
            value={draft.contact}
            onChangeText={(contact) => setDraft((current) => ({ ...current, contact }))}
          />

          <View style={styles.ratingRow}>
            <Text style={styles.ratingLabel}>Rating</Text>
            {[1, 2, 3, 4, 5].map((value) => (
              <Pressable
                key={value}
                onPress={() => setDraft((current) => ({ ...current, rating: value }))}
                style={[
                  styles.ratingPill,
                  draft.rating === value && styles.ratingPillSelected,
                ]}
              >
                <Text
                  style={[
                    styles.ratingPillText,
                    draft.rating === value && styles.ratingPillTextSelected,
                  ]}
                >
                  {value}
                </Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.actionRow}>
            <Pressable style={styles.primaryButton} onPress={submitIdea}>
              <Text style={styles.primaryButtonText}>Save idea</Text>
            </Pressable>
            <Pressable style={styles.secondaryButton} onPress={importDatabase}>
              <Text style={styles.secondaryButtonText}>Import</Text>
            </Pressable>
            <Pressable style={styles.secondaryButton} onPress={exportDatabase}>
              <Text style={styles.secondaryButtonText}>Export</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.panel}>
          <Text style={styles.sectionTitle}>Stored ideas</Text>
          {ideas.map((idea) => (
            <View key={idea.id} style={styles.ideaCard}>
              <View style={styles.ideaHeader}>
                <View>
                  <Text style={styles.ideaTitle}>{idea.title}</Text>
                  <Text style={styles.ideaMeta}>
                    {idea.market || 'No market'} • {idea.revenueModel || 'No business model'}
                  </Text>
                </View>
                <View style={styles.scoreBadge}>
                  <Text style={styles.scoreText}>{idea.rating}/5</Text>
                </View>
              </View>

              <Text style={styles.ideaNotes}>{idea.notes}</Text>
              <Text style={styles.ideaDetail}>Next step: {idea.nextStep || 'Not set'}</Text>
              <Text style={styles.ideaDetail}>Contact: {idea.contact || 'Not set'}</Text>
              <Text style={styles.ideaTimestamp}>
                Updated {new Date(idea.updatedAt).toLocaleDateString()}
              </Text>
              <Pressable style={styles.deleteButton} onPress={() => {
                deleteIdea(idea.id);
                refreshIdeas();
              }}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#020617',
  },
  container: {
    padding: 20,
    gap: 18,
  },
  headerCard: {
    backgroundColor: '#111827',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1e293b',
    gap: 18,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  eyebrow: {
    color: '#38bdf8',
    fontSize: 13,
    fontWeight: '700',
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
    maxWidth: 260,
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
    padding: 14,
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
  panel: {
    backgroundColor: '#0f172a',
    borderRadius: 22,
    padding: 18,
    gap: 12,
  },
  sectionTitle: {
    color: '#f8fafc',
    fontSize: 20,
    fontWeight: '700',
  },
  input: {
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#f8fafc',
    backgroundColor: '#111827',
  },
  textArea: {
    minHeight: 96,
    textAlignVertical: 'top',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  ratingLabel: {
    color: '#cbd5e1',
    marginRight: 8,
    fontWeight: '600',
  },
  ratingPill: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#475569',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  ratingPillSelected: {
    backgroundColor: '#38bdf8',
    borderColor: '#38bdf8',
  },
  ratingPillText: {
    color: '#e2e8f0',
    fontWeight: '700',
  },
  ratingPillTextSelected: {
    color: '#082f49',
  },
  actionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  primaryButton: {
    backgroundColor: '#22c55e',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  primaryButtonText: {
    color: '#052e16',
    fontWeight: '800',
  },
  secondaryButton: {
    backgroundColor: '#1e293b',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  secondaryButtonText: {
    color: '#e2e8f0',
    fontWeight: '700',
  },
  ideaCard: {
    backgroundColor: '#111827',
    borderRadius: 18,
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  ideaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  ideaTitle: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '800',
    maxWidth: 240,
  },
  ideaMeta: {
    color: '#94a3b8',
    marginTop: 4,
  },
  scoreBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#1d4ed8',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  scoreText: {
    color: '#eff6ff',
    fontWeight: '800',
  },
  ideaNotes: {
    color: '#e2e8f0',
    lineHeight: 20,
  },
  ideaDetail: {
    color: '#cbd5e1',
  },
  ideaTimestamp: {
    color: '#64748b',
    fontSize: 12,
  },
  deleteButton: {
    alignSelf: 'flex-start',
    marginTop: 4,
    backgroundColor: '#3f0d16',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  deleteButtonText: {
    color: '#fecdd3',
    fontWeight: '700',
  },
});
