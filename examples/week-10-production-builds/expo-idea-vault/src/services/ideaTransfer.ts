import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';

import type { DraftIdea, IdeaRecord } from '../types';
import { parseIdeasFromBackup, serializeIdeasForExport } from '../utils/ideaBackup';

type WebDocumentPickerAsset = {
  file?: File;
  name?: string;
  uri: string;
};

type BrowserWindow = Window & typeof globalThis;

function getBrowserWindow(): BrowserWindow {
  const browserWindow = globalThis.window as BrowserWindow | undefined;
  if (!browserWindow || !browserWindow.document || !browserWindow.URL) {
    throw new Error('Backup export is only available in a browser environment.');
  }

  return browserWindow;
}

export async function exportIdeas(ideas: IdeaRecord[]) {
  const browserWindow = getBrowserWindow();
  const contents = serializeIdeasForExport(ideas);
  const blob = new browserWindow.Blob([contents], { type: 'application/json' });
  const fileUri = browserWindow.URL.createObjectURL(blob);
  const downloadName = `expo-idea-vault-backup-${new Date().toISOString().slice(0, 10)}.json`;
  const downloadLink = browserWindow.document.createElement('a');

  downloadLink.href = fileUri;
  downloadLink.download = downloadName;
  downloadLink.style.display = 'none';

  browserWindow.document.body.appendChild(downloadLink);
  downloadLink.click();
  browserWindow.document.body.removeChild(downloadLink);
  browserWindow.setTimeout(() => {
    browserWindow.URL.revokeObjectURL(fileUri);
  }, 0);

  return downloadName;
}

async function readPickedFile(asset: WebDocumentPickerAsset) {
  if (asset.file) {
    return asset.file.text();
  }

  const response = await fetch(asset.uri);
  if (!response.ok) {
    throw new Error(`Unable to read backup file (${response.status}).`);
  }

  return response.text();
}

export async function importIdeas(): Promise<DraftIdea[] | null> {
  const result = await DocumentPicker.getDocumentAsync({
    copyToCacheDirectory: true,
    type: 'application/json',
  });

  if (result.canceled) {
    return null;
  }

  const [file] = result.assets as WebDocumentPickerAsset[];
  const contents = await readPickedFile(file);
  return parseIdeasFromBackup(contents);
}
