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
    <View style={styles.board}>
      <Text style={styles.title}>Stored ideas</Text>
      <Text style={styles.copy}>
        The app writes to local SQLite storage, supports duplication back into the draft form, and can restore/export backups.
      </Text>
      {ideas.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} onDuplicate={onDuplicate} onDelete={onDelete} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    gap: 14,
  },
  title: {
    color: '#0f172a',
    fontSize: 20,
    fontWeight: '800',
  },
  copy: {
    color: '#475569',
    lineHeight: 20,
  },
});
