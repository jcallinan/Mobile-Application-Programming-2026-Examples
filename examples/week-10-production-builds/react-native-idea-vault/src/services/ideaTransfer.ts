import DocumentPicker from 'react-native-document-picker';
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
  const result = await DocumentPicker.pickSingle({
    type: [DocumentPicker.types.plainText, 'application/json'],
    copyTo: 'documentDirectory',
  });

  const filePath = result.fileCopyUri?.replace('file://', '') ?? result.uri.replace('file://', '');
  const content = await RNFS.readFile(filePath, 'utf8');
  return parseIdeasFromBackup(content);
}
