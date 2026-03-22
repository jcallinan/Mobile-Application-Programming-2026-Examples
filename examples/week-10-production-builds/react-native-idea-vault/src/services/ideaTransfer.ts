import { keepLocalCopy, pick, types } from '@react-native-documents/picker';
import { Alert, Platform } from 'react-native';
import RNFS from 'react-native-fs';

import type { DraftIdea, IdeaRecord } from '../types';
import { parseIdeasFromBackup, serializeIdeasForExport } from '../utils/ideaBackup';

const EXPORT_FILENAME = 'react-native-idea-vault-export.json';

function getExportPath() {
  if (Platform.OS === 'android' && RNFS.DownloadDirectoryPath) {
    return `${RNFS.DownloadDirectoryPath}/${EXPORT_FILENAME}`;
  }

  return `${RNFS.DocumentDirectoryPath}/${EXPORT_FILENAME}`;
}

export async function exportIdeas(ideas: IdeaRecord[]) {
  const path = getExportPath();
  await RNFS.writeFile(path, serializeIdeasForExport(ideas), 'utf8');

  if (Platform.OS === 'android') {
    Alert.alert('Export saved', `Backup saved to Downloads as ${EXPORT_FILENAME}.`);
  }

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
