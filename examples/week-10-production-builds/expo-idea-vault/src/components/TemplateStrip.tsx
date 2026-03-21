import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import type { IdeaTemplate } from '../types';

type TemplateStripProps = {
  templates: IdeaTemplate[];
  onUseTemplate: (template: IdeaTemplate) => void;
};

export function TemplateStrip({ templates, onUseTemplate }: TemplateStripProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>Quick-add templates</Text>
      <Text style={styles.sectionCopy}>
        Students can add data manually, start from a template, duplicate an idea, or import a backup.
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {templates.map((template) => (
          <Pressable
            key={template.id}
            onPress={() => onUseTemplate(template)}
            style={[styles.card, { borderColor: template.accent }]}
          >
            <Text style={styles.cardLabel}>{template.label}</Text>
            <Text style={styles.cardCopy}>{template.description}</Text>
            <Text style={[styles.cardAction, { color: template.accent }]}>Use template</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#0f172a',
    borderRadius: 24,
    padding: 18,
    gap: 10,
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
  row: {
    gap: 12,
    paddingRight: 6,
  },
  card: {
    width: 210,
    backgroundColor: '#111827',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    gap: 8,
  },
  cardLabel: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '700',
  },
  cardCopy: {
    color: '#cbd5e1',
    lineHeight: 18,
    minHeight: 36,
  },
  cardAction: {
    fontWeight: '700',
  },
});
