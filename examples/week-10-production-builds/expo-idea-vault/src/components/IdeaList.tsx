import { StyleSheet, Text, View } from 'react-native';

import type { IdeaRecord } from '../types';
import { IdeaCard } from './IdeaCard';

type IdeaListProps = {
  ideas: IdeaRecord[];
  onDuplicate: (idea: IdeaRecord) => void;
  onDelete: (id: number) => void;
};

export function IdeaList({ ideas, onDuplicate, onDelete }: IdeaListProps) {
  return (
    <View style={styles.panel}>
      <Text style={styles.sectionTitle}>Saved locally</Text>
      <Text style={styles.sectionCopy}>
        Every saved item is written to the on-device SQLite database and can be exported or duplicated.
      </Text>
      {ideas.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} onDuplicate={onDuplicate} onDelete={onDelete} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: '#0f172a',
    borderRadius: 24,
    padding: 18,
    gap: 12,
  },
  sectionTitle: {
    color: '#f8fafc',
    fontSize: 20,
    fontWeight: '700',
  },
  sectionCopy: {
    color: '#cbd5e1',
    lineHeight: 20,
  },
});
