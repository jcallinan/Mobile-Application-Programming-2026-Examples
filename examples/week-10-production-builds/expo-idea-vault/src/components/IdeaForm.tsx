import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import type { DraftIdea } from '../types';

type IdeaFormProps = {
  draft: DraftIdea;
  onChange: (nextDraft: DraftIdea) => void;
  onSubmit: () => void;
  onImport: () => void;
  onExport: () => void;
  onReset: () => void;
};

export function IdeaForm({ draft, onChange, onSubmit, onImport, onExport, onReset }: IdeaFormProps) {
  const updateField = <K extends keyof DraftIdea>(key: K, value: DraftIdea[K]) => {
    onChange({ ...draft, [key]: value });
  };

  return (
    <View style={styles.panel}>
      <Text style={styles.sectionTitle}>Idea workspace</Text>
      <Text style={styles.sectionCopy}>
        Enter a concept manually, refine a template, or prepare a draft before saving it locally.
      </Text>

      <TextInput
        placeholder="Idea title"
        placeholderTextColor="#94a3b8"
        style={styles.input}
        value={draft.title}
        onChangeText={(value) => updateField('title', value)}
      />
      <TextInput
        placeholder="Problem worth solving"
        placeholderTextColor="#94a3b8"
        style={styles.input}
        value={draft.problem}
        onChangeText={(value) => updateField('problem', value)}
      />
      <TextInput
        placeholder="Notes"
        placeholderTextColor="#94a3b8"
        multiline
        style={[styles.input, styles.textArea]}
        value={draft.notes}
        onChangeText={(value) => updateField('notes', value)}
      />
      <TextInput
        placeholder="Target market"
        placeholderTextColor="#94a3b8"
        style={styles.input}
        value={draft.market}
        onChangeText={(value) => updateField('market', value)}
      />
      <TextInput
        placeholder="Revenue model"
        placeholderTextColor="#94a3b8"
        style={styles.input}
        value={draft.revenueModel}
        onChangeText={(value) => updateField('revenueModel', value)}
      />
      <TextInput
        placeholder="Next validation step"
        placeholderTextColor="#94a3b8"
        style={styles.input}
        value={draft.nextStep}
        onChangeText={(value) => updateField('nextStep', value)}
      />
      <TextInput
        placeholder="Best contact or lead"
        placeholderTextColor="#94a3b8"
        style={styles.input}
        value={draft.contact}
        onChangeText={(value) => updateField('contact', value)}
      />

      <View style={styles.ratingRow}>
        <Text style={styles.ratingLabel}>Rating</Text>
        {[1, 2, 3, 4, 5].map((value) => (
          <Pressable
            key={value}
            onPress={() => updateField('rating', value)}
            style={[styles.ratingPill, draft.rating === value && styles.ratingPillSelected]}
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
        <Pressable style={styles.primaryButton} onPress={onSubmit}>
          <Text style={styles.primaryButtonText}>Save locally</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={onReset}>
          <Text style={styles.secondaryButtonText}>Clear draft</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={onImport}>
          <Text style={styles.secondaryButtonText}>Import backup</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={onExport}>
          <Text style={styles.secondaryButtonText}>Export backup</Text>
        </Pressable>
      </View>
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
});
