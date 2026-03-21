import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

import type { DraftIdea, IdeaRecord } from '../types';
import { parseIdeasFromBackup, serializeIdeasForExport } from '../utils/ideaBackup';

export async function exportIdeas(ideas: IdeaRecord[]) {
  const directory = FileSystem.cacheDirectory;
  if (!directory) {
    throw new Error('No writable cache directory was available.');
  }

  const fileUri = `${directory}expo-idea-vault-export.json`;
  await FileSystem.writeAsStringAsync(fileUri, serializeIdeasForExport(ideas), {
    encoding: FileSystem.EncodingType.UTF8,
  });

  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(fileUri);
  }

  return fileUri;
}

export async function importIdeas(): Promise<DraftIdea[] | null> {
  const result = await DocumentPicker.getDocumentAsync({
    copyToCacheDirectory: true,
    type: 'application/json',
  });

  if (result.canceled) {
    return null;
  }

  const file = result.assets[0];
  const contents = await FileSystem.readAsStringAsync(file.uri, {
    encoding: FileSystem.EncodingType.UTF8,
  });

  return parseIdeasFromBackup(contents);
}
