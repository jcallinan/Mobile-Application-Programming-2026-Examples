import type { DraftIdea, IdeaRecord } from '../types';

const clampRating = (rating: number) => Math.max(1, Math.min(5, Math.round(rating || 0)));

export function sanitizeIdeaDraft(input: Partial<DraftIdea>): DraftIdea {
  return {
    title: String(input.title ?? '').trim(),
    notes: String(input.notes ?? '').trim(),
    rating: clampRating(Number(input.rating ?? 3)),
    audience: String(input.audience ?? '').trim(),
    moat: String(input.moat ?? '').trim(),
    channel: String(input.channel ?? '').trim(),
    nextExperiment: String(input.nextExperiment ?? '').trim(),
    pricing: String(input.pricing ?? '').trim(),
  };
}

export function serializeIdeasForExport(ideas: IdeaRecord[]): string {
  return JSON.stringify(
    ideas.map(({ id: _id, updatedAt: _updatedAt, ...draft }) => sanitizeIdeaDraft(draft)),
    null,
    2,
  );
}

export function parseIdeasFromBackup(contents: string): DraftIdea[] {
  const parsed = JSON.parse(contents) as Partial<DraftIdea>[];
  if (!Array.isArray(parsed)) {
    throw new Error('Backup file must contain an array of ideas.');
  }

  return parsed
    .map((item) => sanitizeIdeaDraft(item))
    .filter((idea) => idea.title.length > 0 && idea.notes.length > 0);
}

export function duplicateIdeaRecord(idea: IdeaRecord): DraftIdea {
  return sanitizeIdeaDraft(idea);
}
