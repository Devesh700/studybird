export type Story = {
  _id: string;
  title: string;
  body: string;
  author: string;
  tags: string[];
  workType: "Story" | "Article" | "Poem";
  description: string;
  whatItsAbout: string;
  originalWork: string;
  validation: string;
  suggestedHashtags: string[];
  categories: string[];
  createdAt: string;
  updatedAt: string;
};

export type StoriesListResponse = {
  items: Story[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};
