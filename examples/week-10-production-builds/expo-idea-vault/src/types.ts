export type IdeaRecord = {
  id: number;
  title: string;
  notes: string;
  rating: number;
  market: string;
  revenueModel: string;
  nextStep: string;
  contact: string;
  problem: string;
  updatedAt: string;
};

export type DraftIdea = Omit<IdeaRecord, 'id' | 'updatedAt'>;

export type IdeaTemplate = {
  id: string;
  label: string;
  accent: string;
  description: string;
  draft: DraftIdea;
};
