import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DEMO_CREATIVITY_SHOWCASE } from "@/lib/demo-creativity";

export type SkillCategory = 'cooking' | 'reading' | 'art' | 'dance' | 'music' | 'crafts' | 'personality' | 'sports';

export type CreativityShowcase = {
  _id: string;
  title: string;
  description?: string;
  mediaUrl: string;
  mediaType: 'image' | 'video' | 'audio';
  skillCategory: SkillCategory;
  creatorName: string;
  creatorAge?: number;
  tags: string[];
  applause: number;
  views: number;
};

export const fetchCreativityShowcase = createAsyncThunk(
  "creativity/fetchList",
  async ({ category, page = 1, limit = 12 }: any) => {
    let filtered = DEMO_CREATIVITY_SHOWCASE;
    if (category && category !== "featured") {
      filtered = filtered.filter(c => c.skillCategory === category);
    }
    
    const start = (page - 1) * limit;
    return {
      items: filtered.slice(start, start + limit) as CreativityShowcase[],
      page,
      totalPages: Math.ceil(filtered.length / limit),
      total: filtered.length
    };
  }
);

const creativitySlice = createSlice({
  name: "creativity",
  initialState: {
    items: [] as CreativityShowcase[],
    status: "idle" as const,
    page: 1,
    totalPages: 0,
  } as {
    items: CreativityShowcase[];
    status: "idle" | "pending" | "succeeded" | "failed";
    page: number;
    totalPages: number;
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCreativityShowcase.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = action.payload.items;
      state.page = action.payload.page;
      state.totalPages = action.payload.totalPages;
    });
  },
});

export default creativitySlice.reducer;
