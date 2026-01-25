import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DEMO_VIDEO_STORIES } from "@/lib/demo-stories";

export type VideoStory = {
  _id: string;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnail?: string;
  duration: number;
  author: string;
  categories: string[];
  tags: string[];
  views: number;
  likes: number;
};

export const fetchVideos = createAsyncThunk(
  "videos/fetchList",
  async ({ category, page = 1, limit = 12 }: any) => {
    // Demo filtering - replace with API later
    let filtered = DEMO_VIDEO_STORIES;
    if (category && category !== "featured") {
      filtered = filtered.filter(v => v.categories.includes(category));
    }
    
    const start = (page - 1) * limit;
    return {
      items: filtered.slice(start, start + limit),
      page,
      totalPages: Math.ceil(filtered.length / limit),
      total: filtered.length
    };
  }
);

const videoSlice = createSlice({
  name: "videos",
  initialState: {
    items: [] as VideoStory[],
    status: "idle" as "idle" | "loading" | "succeeded" | "failed",
    current: null as VideoStory | null,
    page: 1,
    totalPages: 0,
  },
  reducers: {
    setCurrentVideo(state, action) {
      state.current = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVideos.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = action.payload.items;
      state.page = action.payload.page;
      state.totalPages = action.payload.totalPages;
    });
  },
});

export const { setCurrentVideo } = videoSlice.actions;
export default videoSlice.reducer;
