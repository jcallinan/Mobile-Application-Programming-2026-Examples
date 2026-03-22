import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';

import type { DraftIdea, IdeaRecord } from '../types';
import { parseIdeasFromBackup, serializeIdeasForExport } from '../utils/ideaBackup';

type ExpoDocumentPickerModule = typeof import('expo-document-picker');

async function loadDocumentPicker(): Promise<ExpoDocumentPickerModule> {
  try {
    return require('expo-document-picker') as ExpoDocumentPickerModule;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    throw new Error(
      `Import Backup requires expo-document-picker in a development build or standalone app. ${message}`,
    );
  }
}

export async function exportIdeas(ideas: IdeaRecord[]) {
  const file = new File(Paths.cache, 'expo-idea-vault-export.json');
  file.create({ overwrite: true, intermediates: true });
  file.write(serializeIdeasForExport(ideas));

  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(file.uri);
    return file.uri;
  }

  throw new Error('Sharing is not available on this device.');
}

export async function importIdeas(): Promise<DraftIdea[] | null> {
  const DocumentPicker = await loadDocumentPicker();
  const result = await DocumentPicker.getDocumentAsync({
    copyToCacheDirectory: true,
    type: 'application/json',
  });

  if (result.canceled) {
    return null;
  }

  const [asset] = result.assets;
  const contents = await new File(asset.uri).text();
  return parseIdeasFromBackup(contents);
}
