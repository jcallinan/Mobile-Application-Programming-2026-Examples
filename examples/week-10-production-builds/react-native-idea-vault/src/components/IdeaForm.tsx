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
    <View style={styles.sheet}>
      <Text style={styles.sheetTitle}>Draft an opportunity</Text>
      <Text style={styles.sheetCopy}>
        Save locally after reviewing audience, differentiation, channel, pricing, and next experiment.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor="#64748b"
        value={draft.title}
        onChangeText={(value) => updateField('title', value)}
      />
      <TextInput
        style={[styles.input, styles.notesInput]}
        multiline
        placeholder="Notes"
        placeholderTextColor="#64748b"
        value={draft.notes}
        onChangeText={(value) => updateField('notes', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Audience"
        placeholderTextColor="#64748b"
        value={draft.audience}
        onChangeText={(value) => updateField('audience', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Competitive moat"
        placeholderTextColor="#64748b"
        value={draft.moat}
        onChangeText={(value) => updateField('moat', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Acquisition channel"
        placeholderTextColor="#64748b"
        value={draft.channel}
        onChangeText={(value) => updateField('channel', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Pricing model"
        placeholderTextColor="#64748b"
        value={draft.pricing}
        onChangeText={(value) => updateField('pricing', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Next experiment"
        placeholderTextColor="#64748b"
        value={draft.nextExperiment}
        onChangeText={(value) => updateField('nextExperiment', value)}
      />

      <View style={styles.ratingRow}>
        {[1, 2, 3, 4, 5].map((value) => (
          <Pressable
            key={value}
            onPress={() => updateField('rating', value)}
            style={[styles.ratingBox, draft.rating === value && styles.ratingBoxActive]}
          >
            <Text style={[styles.ratingText, draft.rating === value && styles.ratingTextActive]}>
              {value}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.buttonGrid}>
        <Pressable style={[styles.button, styles.primaryButton]} onPress={onSubmit}>
          <Text style={styles.primaryButtonText}>Save locally</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.secondaryButton]} onPress={onReset}>
          <Text style={styles.secondaryButtonText}>Clear draft</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.secondaryButton]} onPress={onImport}>
          <Text style={styles.secondaryButtonText}>Import backup</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.secondaryButton]} onPress={onExport}>
          <Text style={styles.secondaryButtonText}>Export backup</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  sheetCopy: {
    color: '#475569',
    lineHeight: 20,
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
});
