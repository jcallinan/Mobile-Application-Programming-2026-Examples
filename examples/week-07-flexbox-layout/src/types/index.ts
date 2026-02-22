export type ExampleRoute = 'dashboard' | 'bookSearch' | 'login';

export type Book = {
  key: string;
  title: string;
  author: string;
  coverId?: number;
  year?: number;
};

export type BookDetail = {
  description: string;
  subjects: string[];
};
