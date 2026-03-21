import type { DraftIdea, IdeaTemplate } from '../types';

export const emptyIdeaDraft: DraftIdea = {
  title: '',
  notes: '',
  rating: 3,
  audience: '',
  moat: '',
  channel: '',
  nextExperiment: '',
  pricing: '',
};

export const ideaTemplates: IdeaTemplate[] = [
  {
    id: 'tool-library',
    label: 'Tool Library',
    accent: '#38bdf8',
    summary: 'A neighborhood lending club for equipment and tools.',
    draft: {
      title: 'Neighborhood tool lending club',
      notes: 'Members reserve shared tools instead of buying everything alone.',
      rating: 4,
      audience: 'Homeowners and renters',
      moat: 'Trusted local inventory and maintenance',
      channel: 'Community Facebook groups',
      nextExperiment: 'Pilot with 15 members',
      pricing: '$12 / month membership',
    },
  },
  {
    id: 'study-planner',
    label: 'Study Planner',
    accent: '#f97316',
    summary: 'Exam-focused planning support for nursing students.',
    draft: {
      title: 'AI study planner for nursing students',
      notes: 'Turn exam objectives into weekly study plans with reminders.',
      rating: 5,
      audience: 'Healthcare students',
      moat: 'Nursing-specific templates',
      channel: 'Campus ambassadors',
      nextExperiment: 'Mock landing page test',
      pricing: '$8 / month subscription',
    },
  },
  {
    id: 'meal-prep',
    label: 'Meal Prep',
    accent: '#ec4899',
    summary: 'Exam-week meal delivery designed around campus schedules.',
    draft: {
      title: 'Meal-prep delivery for finals week',
      notes: 'Offer focused exam-week meal bundles with campus drop-off.',
      rating: 5,
      audience: 'College students',
      moat: 'Fast campus delivery windows',
      channel: 'Instagram reels',
      nextExperiment: 'Waitlist landing page',
      pricing: '$39 weekly pack',
    },
  },
];

export function createDraftFromTemplate(template: IdeaTemplate): DraftIdea {
  return { ...template.draft };
}
