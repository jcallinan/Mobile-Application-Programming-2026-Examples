import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { IdeaRecord } from '../types';

type IdeaCardProps = {
  idea: IdeaRecord;
  onDuplicate: (idea: IdeaRecord) => void;
  onDelete: (id: number) => void;
};

export function IdeaCard({ idea, onDuplicate, onDelete }: IdeaCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.copy}>
          <Text style={styles.title}>{idea.title}</Text>
          <Text style={styles.meta}>{idea.market || 'No market'} • {idea.revenueModel || 'No model'}</Text>
        </View>
        <View style={styles.scoreBadge}>
          <Text style={styles.scoreText}>{idea.rating}/5</Text>
        </View>
      </View>

      <Text style={styles.problem}>Problem: {idea.problem || 'Not defined yet'}</Text>
      <Text style={styles.notes}>{idea.notes}</Text>
      <Text style={styles.detail}>Next step: {idea.nextStep || 'Not set'}</Text>
      <Text style={styles.detail}>Contact: {idea.contact || 'Not set'}</Text>
      <Text style={styles.timestamp}>Updated {new Date(idea.updatedAt).toLocaleDateString()}</Text>

      <View style={styles.actions}>
        <Pressable style={styles.secondaryButton} onPress={() => onDuplicate(idea)}>
          <Text style={styles.secondaryButtonText}>Duplicate to draft</Text>
        </Pressable>
        <Pressable style={styles.deleteButton} onPress={() => onDelete(idea.id)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111827',
    borderRadius: 18,
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  copy: {
    flex: 1,
  },
  title: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '800',
  },
  meta: {
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
  problem: {
    color: '#7dd3fc',
    fontWeight: '700',
  },
  notes: {
    color: '#e2e8f0',
    lineHeight: 20,
  },
  detail: {
    color: '#cbd5e1',
  },
  timestamp: {
    color: '#64748b',
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 4,
  },
  secondaryButton: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  secondaryButtonText: {
    color: '#e2e8f0',
    fontWeight: '700',
  },
  deleteButton: {
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
