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
        <Text style={styles.tag}>Pricing: {idea.pricing || 'TBD'}</Text>
      </View>
      <Text style={styles.experimentText}>Next experiment: {idea.nextExperiment || 'Not set'}</Text>
      <View style={styles.actions}>
        <Pressable style={styles.duplicateButton} onPress={() => onDuplicate(idea)}>
          <Text style={styles.duplicateButtonText}>Duplicate to draft</Text>
        </Pressable>
        <Pressable style={styles.removeButton} onPress={() => onDelete(idea.id)}>
          <Text style={styles.removeButtonText}>Remove</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
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
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  duplicateButton: {
    backgroundColor: '#e0f2fe',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  duplicateButtonText: {
    color: '#075985',
    fontWeight: '700',
  },
  removeButton: {
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
