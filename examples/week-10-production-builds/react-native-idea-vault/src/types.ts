export type IdeaRecord = {
  id: number;
  title: string;
  notes: string;
  rating: number;
  audience: string;
  moat: string;
  channel: string;
  nextExperiment: string;
  pricing: string;
  updatedAt: string;
};

export type DraftIdea = Omit<IdeaRecord, 'id' | 'updatedAt'>;

export type IdeaTemplate = {
  id: string;
  label: string;
  accent: string;
  summary: string;
  draft: DraftIdea;
};
