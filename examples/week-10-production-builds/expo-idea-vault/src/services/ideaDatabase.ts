import { ideaTemplates } from '../data/ideaTemplates';
import { sanitizeIdeaDraft } from '../utils/ideaBackup';
import type { DraftIdea, IdeaRecord } from '../types';

const storageKey = 'expo-idea-vault.web-ideas';

let webIdeas: IdeaRecord[] = [];
let nextIdeaId = 1;

type StorageLike = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
};

function getBrowserStorage(): StorageLike | null {
  const storageCandidate = (globalThis as { localStorage?: StorageLike }).localStorage;
  return storageCandidate ?? null;
}

function sortIdeas(ideas: IdeaRecord[]) {
  return [...ideas].sort((left, right) => {
    if (right.rating !== left.rating) {
      return right.rating - left.rating;
    }

    return right.updatedAt.localeCompare(left.updatedAt);
  });
}

function persistIdeas() {
  const storage = getBrowserStorage();
  if (!storage) {
    return;
  }

  storage.setItem(storageKey, JSON.stringify(webIdeas));
}

function seedIdeas() {
  webIdeas = ideaTemplates.map((template, index) => ({
    id: index + 1,
    ...sanitizeIdeaDraft(template.draft),
    updatedAt: new Date().toISOString(),
  }));
  nextIdeaId = webIdeas.length + 1;
  persistIdeas();
}

export function initializeIdeaDatabase() {
  const storage = getBrowserStorage();
  if (storage) {
    const storedIdeas = storage.getItem(storageKey);
    if (storedIdeas) {
      const parsedIdeas = JSON.parse(storedIdeas) as IdeaRecord[];
      webIdeas = sortIdeas(parsedIdeas);
      nextIdeaId = webIdeas.reduce((maxId, idea) => Math.max(maxId, idea.id), 0) + 1;
      return;
    }
  }

  if (webIdeas.length === 0) {
    seedIdeas();
  }
}

export function listIdeas(): IdeaRecord[] {
  return sortIdeas(webIdeas);
}

export function insertIdea(input: DraftIdea) {
  webIdeas = sortIdeas([
    ...webIdeas,
    {
      id: nextIdeaId,
      ...sanitizeIdeaDraft(input),
      updatedAt: new Date().toISOString(),
    },
  ]);
  nextIdeaId += 1;
  persistIdeas();
}

export function deleteIdea(id: number) {
  webIdeas = webIdeas.filter((idea) => idea.id !== id);
  persistIdeas();
}

export function replaceIdeas(ideas: DraftIdea[]) {
  webIdeas = sortIdeas(
    ideas.map((idea, index) => ({
      id: index + 1,
      ...sanitizeIdeaDraft(idea),
      updatedAt: new Date().toISOString(),
    })),
  );
  nextIdeaId = webIdeas.length + 1;
  persistIdeas();
}
