import { useEffect, useMemo, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import { IdeaForm } from '../components/IdeaForm';
import { IdeaList } from '../components/IdeaList';
import { ScreenHeader } from '../components/ScreenHeader';
import { TemplateStrip } from '../components/TemplateStrip';
import { createDraftFromTemplate, emptyIdeaDraft, ideaTemplates } from '../data/ideaTemplates';
import { deleteIdea, initializeIdeaDatabase, insertIdea, loadIdeas, replaceIdeas } from '../services/ideaDatabase';
import { exportIdeas, importIdeas } from '../services/ideaTransfer';
import type { DraftIdea, IdeaRecord, IdeaTemplate } from '../types';
import { duplicateIdeaRecord, sanitizeIdeaDraft } from '../utils/ideaBackup';

export function IdeaLabScreen() {
  const [draft, setDraft] = useState<DraftIdea>(emptyIdeaDraft);
  const [ideas, setIdeas] = useState<IdeaRecord[]>([]);

  const refreshIdeas = () => {
    loadIdeas(setIdeas);
  };

  useEffect(() => {
    initializeIdeaDatabase(refreshIdeas);
  }, []);

  const topRated = useMemo(() => ideas.filter((idea) => idea.rating >= 4).length, [ideas]);

  const saveDraft = () => {
    const nextDraft = sanitizeIdeaDraft(draft);
    if (!nextDraft.title || !nextDraft.notes) {
      Alert.alert('Missing info', 'Add a title and notes before saving.');
      return;
    }

    insertIdea(nextDraft, () => {
      setDraft(emptyIdeaDraft);
      refreshIdeas();
      Alert.alert('Saved', 'The idea was stored in the local SQLite database.');
    });
  };

  const useTemplate = (template: IdeaTemplate) => {
    setDraft(createDraftFromTemplate(template));
  };

  const duplicateIdea = (idea: IdeaRecord) => {
    setDraft(duplicateIdeaRecord(idea));
  };

  const removeIdea = (id: number) => {
    deleteIdea(id, refreshIdeas);
  };

  const handleImport = async () => {
    try {
      const importedIdeas = await importIdeas();
      replaceIdeas(importedIdeas, () => {
        refreshIdeas();
        Alert.alert('Import complete', `Loaded ${importedIdeas.length} ideas.`);
      });
    } catch (error) {
      Alert.alert('Import failed', error instanceof Error ? error.message : 'Unknown import error.');
    }
  };

  const handleExport = async () => {
    try {
      const path = await exportIdeas(ideas);
      Alert.alert('Export ready', `Backup saved to ${path}`);
    } catch (error) {
      Alert.alert('Export failed', error instanceof Error ? error.message : 'Unknown export error.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <ScreenHeader count={ideas.length} topRated={topRated} />
        <TemplateStrip templates={ideaTemplates} onUseTemplate={useTemplate} />
        <IdeaForm
          draft={draft}
          onChange={setDraft}
          onSubmit={saveDraft}
          onImport={handleImport}
          onExport={handleExport}
          onReset={() => setDraft(emptyIdeaDraft)}
        />
        <IdeaList ideas={ideas} onDuplicate={duplicateIdea} onDelete={removeIdea} />
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
});
