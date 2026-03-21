import type { DraftIdea, IdeaTemplate } from '../types';

export const emptyIdeaDraft: DraftIdea = {
  title: '',
  notes: '',
  rating: 3,
  market: '',
  revenueModel: '',
  nextStep: '',
  contact: '',
  problem: '',
};

export const ideaTemplates: IdeaTemplate[] = [
  {
    id: 'campus-coffee',
    label: 'Campus Coffee',
    accent: '#38bdf8',
    description: 'A fast beverage concept for school events.',
    draft: {
      title: 'Pop-up coffee cart for campus events',
      notes: 'Test demand during orientation, sports games, and club fairs.',
      rating: 4,
      market: 'College students and event attendees',
      revenueModel: 'Per drink sales + event packages',
      nextStep: 'Interview three student organizations',
      contact: 'events@campus.test',
      problem: 'Event organizers need a simple premium refreshment option.',
    },
  },
  {
    id: 'maker-box',
    label: 'Maker Box',
    accent: '#34d399',
    description: 'Monthly subscription featuring local creators.',
    draft: {
      title: 'Local maker subscription box',
      notes: 'Bundle handmade products from nearby creators every month.',
      rating: 5,
      market: 'Gift buyers and local shoppers',
      revenueModel: 'Monthly subscription',
      nextStep: 'Validate pricing with 10 target customers',
      contact: 'makers@example.test',
      problem: 'Local creators struggle to reach repeat buyers consistently.',
    },
  },
  {
    id: 'laundry-pickup',
    label: 'Laundry Pickup',
    accent: '#f97316',
    description: 'Convenience service for dorm residents.',
    draft: {
      title: 'Campus laundry pickup',
      notes: 'Offer scheduled pickup and next-day return in residence halls.',
      rating: 4,
      market: 'Students living on campus',
      revenueModel: 'Per order fee',
      nextStep: 'Survey one dorm floor about pricing and timing',
      contact: 'housing@example.edu',
      problem: 'Students dislike carrying laundry across campus.',
    },
  },
];

export function createDraftFromTemplate(template: IdeaTemplate): DraftIdea {
  return { ...template.draft };
}
