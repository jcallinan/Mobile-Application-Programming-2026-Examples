import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import type { IdeaTemplate } from '../types';

type TemplateStripProps = {
  templates: IdeaTemplate[];
  onUseTemplate: (template: IdeaTemplate) => void;
};

export function TemplateStrip({ templates, onUseTemplate }: TemplateStripProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Starter templates</Text>
      <Text style={styles.copy}>
        Add data in multiple ways: start from a template, enter a manual draft, duplicate an existing idea, or restore from backup.
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {templates.map((template) => (
          <Pressable
            key={template.id}
            onPress={() => onUseTemplate(template)}
            style={[styles.card, { borderTopColor: template.accent }]}
          >
            <Text style={styles.cardLabel}>{template.label}</Text>
            <Text style={styles.cardCopy}>{template.summary}</Text>
            <Text style={[styles.cardAction, { color: template.accent }]}>Load into draft</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#ffffff',
    borderRadius: 28,
    padding: 18,
    gap: 10,
    borderWidth: 2,
    borderColor: '#e2e8f0',
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
  row: {
    gap: 12,
    paddingRight: 6,
  },
  card: {
    width: 220,
    backgroundColor: '#f8fafc',
    borderRadius: 22,
    padding: 14,
    borderTopWidth: 5,
    gap: 8,
  },
  cardLabel: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '800',
  },
  cardCopy: {
    color: '#475569',
    lineHeight: 18,
    minHeight: 36,
  },
  cardAction: {
    fontWeight: '800',
  },
});
