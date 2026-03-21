import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import SQLite from 'react-native-sqlite-storage';

type IdeaRecord = {
  id: number;
  title: string;
  notes: string;
  rating: number;
  audience: string;
  moat: string;
  channel: string;
  nextExperiment: string;
  updatedAt: string;
};

type DraftIdea = Omit<IdeaRecord, 'id' | 'updatedAt'>;

const seedIdeas: DraftIdea[] = [
  {
    title: 'Neighborhood tool lending club',
    notes: 'Members reserve shared tools instead of buying everything alone.',
    rating: 4,
    audience: 'Homeowners and renters',
    moat: 'Trusted local inventory',
    channel: 'Community Facebook groups',
    nextExperiment: 'Pilot with 15 members',
  },
  {
    title: 'AI study planner for nursing students',
    notes: 'Turn exam objectives into weekly study plans with reminders.',
    rating: 5,
    audience: 'Healthcare students',
    moat: 'Nursing-specific templates',
    channel: 'Campus ambassadors',
    nextExperiment: 'Mock landing page test',
  },
];

const database = SQLite.openDatabase({
  name: 'react-native-idea-vault.db',
  location: 'default',
});

const emptyDraft: DraftIdea = {
  title: '',
  notes: '',
  rating: 3,
  audience: '',
  moat: '',
  channel: '',
  nextExperiment: '',
};

export default function App() {
  const [draft, setDraft] = useState<DraftIdea>(emptyDraft);
  const [ideas, setIdeas] = useState<IdeaRecord[]>([]);

  useEffect(() => {
    bootstrapDatabase();
  }, []);

  const topRated = useMemo(() => {
    return ideas.filter((idea) => idea.rating >= 4).length;
  }, [ideas]);

  const bootstrapDatabase = () => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `CREATE TABLE IF NOT EXISTS ideas (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          notes TEXT NOT NULL,
          rating INTEGER NOT NULL,
          audience TEXT NOT NULL,
          moat TEXT NOT NULL,
          channel TEXT NOT NULL,
          nextExperiment TEXT NOT NULL,
          updatedAt TEXT NOT NULL
        );`,
      );

      transaction.executeSql('SELECT COUNT(*) as count FROM ideas', [], (_tx, result) => {
        const count = result.rows.item(0).count as number;
        if (count === 0) {
          seedIdeas.forEach((idea) => {
            transaction.executeSql(
              `INSERT INTO ideas (title, notes, rating, audience, moat, channel, nextExperiment, updatedAt)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
              [
                idea.title.trim(),
                idea.notes.trim(),
                idea.rating,
                idea.audience.trim(),
                idea.moat.trim(),
                idea.channel.trim(),
                idea.nextExperiment.trim(),
                new Date().toISOString(),
              ],
            );
          });
        }
      });
    }, undefined, loadIdeas);
  };

  const loadIdeas = () => {
    database.transaction((transaction) => {
      transaction.executeSql(
        'SELECT * FROM ideas ORDER BY rating DESC, updatedAt DESC',
        [],
        (_tx, result) => {
          const nextIdeas: IdeaRecord[] = [];
          for (let index = 0; index < result.rows.length; index += 1) {
            nextIdeas.push(result.rows.item(index) as IdeaRecord);
          }
          setIdeas(nextIdeas);
        },
      );
    });
  };

  const insertIdea = (idea: DraftIdea, onComplete?: () => void) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `INSERT INTO ideas (title, notes, rating, audience, moat, channel, nextExperiment, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          idea.title.trim(),
          idea.notes.trim(),
          idea.rating,
          idea.audience.trim(),
          idea.moat.trim(),
          idea.channel.trim(),
          idea.nextExperiment.trim(),
          new Date().toISOString(),
        ],
      );
    }, undefined, onComplete);
  };

  const deleteIdea = (id: number) => {
    database.transaction((transaction) => {
      transaction.executeSql('DELETE FROM ideas WHERE id = ?', [id], () => loadIdeas());
    });
  };

  const replaceIdeas = (nextIdeas: DraftIdea[]) => {
    database.transaction((transaction) => {
      transaction.executeSql('DELETE FROM ideas');
      nextIdeas.forEach((idea) => {
        transaction.executeSql(
          `INSERT INTO ideas (title, notes, rating, audience, moat, channel, nextExperiment, updatedAt)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            idea.title.trim(),
            idea.notes.trim(),
            idea.rating,
            idea.audience.trim(),
            idea.moat.trim(),
            idea.channel.trim(),
            idea.nextExperiment.trim(),
            new Date().toISOString(),
          ],
        );
      });
    }, undefined, loadIdeas);
  };

  const submitIdea = () => {
    if (!draft.title.trim() || !draft.notes.trim()) {
      Alert.alert('Missing info', 'Add a title and notes before saving.');
      return;
    }

    insertIdea(draft, () => {
      setDraft(emptyDraft);
      loadIdeas();
    });
  };

  const exportIdeas = async () => {
    const payload = JSON.stringify(
      ideas.map(({ id: _id, updatedAt: _updatedAt, ...idea }) => idea),
      null,
      2,
    );
    const path = `${RNFS.DocumentDirectoryPath}/react-native-idea-vault-export.json`;
    await RNFS.writeFile(path, payload, 'utf8');

    await Share.share({
      title: 'React Native Idea Vault Export',
      message: `Database export saved to ${path}`,
      url: `file://${path}`,
    });
  };

  const importIdeas = async () => {
    const result = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.plainText, 'application/json'],
      copyTo: 'documentDirectory',
    });

    const filePath = result.fileCopyUri?.replace('file://', '') ?? result.uri.replace('file://', '');
    const content = await RNFS.readFile(filePath, 'utf8');
    const parsed = JSON.parse(content) as DraftIdea[];
    replaceIdeas(parsed);
    Alert.alert('Import complete', `Loaded ${parsed.length} ideas.`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.banner}>
          <View>
            <Text style={styles.title}>Idea Lab</Text>
            <Text style={styles.subtitle}>
              Validate, score, and back up startup concepts with a local database.
            </Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>React Native</Text>
          </View>
        </View>

        <View style={styles.scoreboard}>
          <View style={[styles.scoreTile, styles.blueTile]}>
            <Text style={styles.scoreLabel}>Saved ideas</Text>
            <Text style={styles.scoreValue}>{ideas.length}</Text>
          </View>
          <View style={[styles.scoreTile, styles.pinkTile]}>
            <Text style={styles.scoreLabel}>Top-rated</Text>
            <Text style={styles.scoreValue}>{topRated}</Text>
          </View>
        </View>

        <View style={styles.sheet}>
          <Text style={styles.sheetTitle}>Capture a concept</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            placeholderTextColor="#64748b"
            value={draft.title}
            onChangeText={(title) => setDraft((current) => ({ ...current, title }))}
          />
          <TextInput
            style={[styles.input, styles.notesInput]}
            multiline
            placeholder="Notes"
            placeholderTextColor="#64748b"
            value={draft.notes}
            onChangeText={(notes) => setDraft((current) => ({ ...current, notes }))}
          />
          <TextInput
            style={styles.input}
            placeholder="Audience"
            placeholderTextColor="#64748b"
            value={draft.audience}
            onChangeText={(audience) => setDraft((current) => ({ ...current, audience }))}
          />
          <TextInput
            style={styles.input}
            placeholder="Competitive moat"
            placeholderTextColor="#64748b"
            value={draft.moat}
            onChangeText={(moat) => setDraft((current) => ({ ...current, moat }))}
          />
          <TextInput
            style={styles.input}
            placeholder="Acquisition channel"
            placeholderTextColor="#64748b"
            value={draft.channel}
            onChangeText={(channel) => setDraft((current) => ({ ...current, channel }))}
          />
          <TextInput
            style={styles.input}
            placeholder="Next experiment"
            placeholderTextColor="#64748b"
            value={draft.nextExperiment}
            onChangeText={(nextExperiment) =>
              setDraft((current) => ({ ...current, nextExperiment }))
            }
          />

          <View style={styles.ratingRow}>
            {[1, 2, 3, 4, 5].map((value) => (
              <Pressable
                key={value}
                onPress={() => setDraft((current) => ({ ...current, rating: value }))}
                style={[
                  styles.ratingBox,
                  draft.rating === value && styles.ratingBoxActive,
                ]}
              >
                <Text
                  style={[
                    styles.ratingText,
                    draft.rating === value && styles.ratingTextActive,
                  ]}
                >
                  {value}
                </Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.buttonGrid}>
            <Pressable style={[styles.button, styles.primaryButton]} onPress={submitIdea}>
              <Text style={styles.primaryButtonText}>Save</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.secondaryButton]} onPress={importIdeas}>
              <Text style={styles.secondaryButtonText}>Import</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.secondaryButton]} onPress={exportIdeas}>
              <Text style={styles.secondaryButtonText}>Export</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.board}>
          {ideas.map((idea) => (
            <View key={idea.id} style={styles.ideaCard}>
              <View style={styles.cardTopRow}>
                <Text style={styles.ideaTitle}>{idea.title}</Text>
                <View style={styles.ratingChip}>
                  <Text style={styles.ratingChipText}>{idea.rating}/5</Text>
                </View>
              </View>
              <Text style={styles.ideaBody}>{idea.notes}</Text>
              <View style={styles.tagRow}>
                <Text style={styles.tag}>Audience: {idea.audience || 'TBD'}</Text>
                <Text style={styles.tag}>Moat: {idea.moat || 'TBD'}</Text>
                <Text style={styles.tag}>Channel: {idea.channel || 'TBD'}</Text>
              </View>
              <Text style={styles.experimentText}>
                Next experiment: {idea.nextExperiment || 'Not set'}
              </Text>
              <Pressable style={styles.removeButton} onPress={() => deleteIdea(idea.id)}>
                <Text style={styles.removeButtonText}>Remove</Text>
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
    backgroundColor: '#f8fafc',
  },
  container: {
    padding: 18,
    gap: 16,
  },
  banner: {
    backgroundColor: '#fff7ed',
    borderRadius: 28,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  title: {
    color: '#7c2d12',
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    color: '#9a3412',
    marginTop: 8,
    lineHeight: 20,
    maxWidth: 240,
  },
  badge: {
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
  sheet: {
    backgroundColor: '#ffffff',
    borderRadius: 28,
    padding: 18,
    gap: 10,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  sheetTitle: {
    color: '#0f172a',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 6,
  },
  input: {
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#0f172a',
  },
  notesInput: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  ratingRow: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 6,
  },
  ratingBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingBoxActive: {
    backgroundColor: '#f97316',
  },
  ratingText: {
    color: '#334155',
    fontWeight: '800',
  },
  ratingTextActive: {
    color: '#fff7ed',
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 4,
  },
  button: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  primaryButton: {
    backgroundColor: '#0f172a',
  },
  primaryButtonText: {
    color: '#f8fafc',
    fontWeight: '800',
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#94a3b8',
  },
  secondaryButtonText: {
    color: '#0f172a',
    fontWeight: '700',
  },
  board: {
    gap: 14,
  },
  ideaCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 18,
    gap: 10,
    borderLeftWidth: 8,
    borderLeftColor: '#38bdf8',
    shadowColor: '#0f172a',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  ideaTitle: {
    flex: 1,
    color: '#0f172a',
    fontSize: 18,
    fontWeight: '800',
  },
  ratingChip: {
    backgroundColor: '#ecfeff',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  ratingChipText: {
    color: '#155e75',
    fontWeight: '800',
  },
  ideaBody: {
    color: '#334155',
    lineHeight: 20,
  },
  tagRow: {
    gap: 6,
  },
  tag: {
    color: '#475569',
  },
  experimentText: {
    color: '#7c2d12',
    fontWeight: '600',
  },
  removeButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#fee2e2',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  removeButtonText: {
    color: '#991b1b',
    fontWeight: '700',
  },
});
