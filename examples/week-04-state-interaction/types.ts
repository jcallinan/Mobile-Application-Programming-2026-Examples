export type MediaItem = {
  id: number;
  title: string;
  url: string;
  category: string;
  notes: string;
  created_at: string;
  rating: number;
  favorite: number;
};

export type NewMediaItem = Omit<MediaItem, 'id' | 'created_at'>;
