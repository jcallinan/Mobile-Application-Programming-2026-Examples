import { keepLocalCopy, pick, types } from '@react-native-documents/picker';
import RNFS from 'react-native-fs';
import { Share } from 'react-native';

import type { DraftIdea, IdeaRecord } from '../types';
import { parseIdeasFromBackup, serializeIdeasForExport } from '../utils/ideaBackup';

export async function exportIdeas(ideas: IdeaRecord[]) {
  const path = `${RNFS.DocumentDirectoryPath}/react-native-idea-vault-export.json`;
  await RNFS.writeFile(path, serializeIdeasForExport(ideas), 'utf8');

  await Share.share({
    title: 'React Native Idea Vault Export',
    message: `Database export saved to ${path}`,
    url: `file://${path}`,
  });

  return path;
}

export async function importIdeas(): Promise<DraftIdea[]> {
  const [pickedFile] = await pick({
    type: [types.plainText, types.json],
  });

  const [localCopy] = await keepLocalCopy({
    destination: 'documentDirectory',
    files: [
      {
        uri: pickedFile.uri,
        fileName: pickedFile.name ?? 'react-native-idea-vault-import.json',
      },
    ],
  });

  if (localCopy.status !== 'success') {
    throw new Error(`Failed to copy imported file locally: ${localCopy.copyError}`);
  }

  const filePath = localCopy.localUri.replace('file://', '');
  const content = await RNFS.readFile(filePath, 'utf8');
  return parseIdeasFromBackup(content);
}
