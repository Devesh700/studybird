import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "@/lib/api";

export type AudioStory = {
  _id: string;
  title: string;
  description?: string;
  audioUrl: string;
  duration: number;
  author: string;
  categories: string[];
  tags: string[];
  thumbnail?: string;
  plays: number;
  likes: number;
};

export const fetchAudioStories = createAsyncThunk(
  "audioStories/fetchList",
  async ({ category, q, page = 1, limit = 12 }: any) => {
    const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
    if (category) params.set("category", category);
    if (q) params.set("q", q);
    
    const { data } = await api.get(`/audio-stories?${params.toString()}`);
    return data;
  }
);

const audioSlice = createSlice({
  name: "audioStories",
  initialState: {
    items: [] as AudioStory[],
    status: "idle" as "idle" | "loading" | "succeeded" | "failed",
    page: 1,
    totalPages: 0,
    total: 0,
    current: null as AudioStory | null,
    player: {
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      volume: 1,
    },
  },
reducers: {
  setPlaying(state, action: PayloadAction<boolean>) {
    state.player.isPlaying = action.payload;
  },
  setCurrent(state, action: PayloadAction<AudioStory>) {
    state.current = action.payload;
  },
  setCurrentTime(state, action: PayloadAction<number>) {
    state.player.currentTime = action.payload;
  },
  setPlayerProgress(state, action: PayloadAction<{ currentTime: number; duration: number }>) {
    state.player.currentTime = action.payload.currentTime;
    state.player.duration = action.payload.duration;
  },
},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAudioStories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAudioStories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.total = action.payload.total;
      });
  },
});

export const { setPlaying, setCurrentTime, setPlayerProgress, setCurrent } = audioSlice.actions;
export default audioSlice.reducer;
