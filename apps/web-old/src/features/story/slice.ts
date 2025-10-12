"use client";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { StoriesListResponse, Story } from "./types";
import { api } from "@/lib/api";

export const fetchStories = createAsyncThunk<
  StoriesListResponse,
  { q?: string; tag?: string; page?: number; limit?: number }
>("stories/fetchList", async (params) => {
  const sp = new URLSearchParams();
  if (params.q) sp.set("q", params.q);
  if (params.tag) sp.set("tag", params.tag);
  if (params.page) sp.set("page", String(params.page));
  if (params.limit) sp.set("limit", String(params.limit));
  const { data } = await api.get<StoriesListResponse>(`/stories?${sp.toString()}`);
  return data;
});

export const fetchStoryById = createAsyncThunk<Story, string>(
  "stories/fetchById",
  async (id) => {
    const { data } = await api.get<Story>(`/stories/${id}`);
    return data;
  }
);

export const createStory = createAsyncThunk<
  Story,
  { title: string; body: string; tags: string[]; author?: string }
>("stories/create", async (payload) => {
  const { data } = await api.post<Story>("/stories", payload);
  return data;
});

type StoriesState = {
  items: Story[];
  page: number;
  totalPages: number;
  total: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
  current?: Story;
  currentStatus: "idle" | "loading" | "succeeded" | "failed";
};

const initialState: StoriesState = {
  items: [],
  page: 1,
  totalPages: 1,
  total: 0,
  status: "idle",
  currentStatus: "idle",
};

const storiesSlice = createSlice({
  name: "stories",
  initialState,
  reducers: {
    clearCurrent(state) {
      state.current = undefined;
      state.currentStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStories.fulfilled, (state, action: PayloadAction<StoriesListResponse>) => {
        state.status = "succeeded";
        state.items = action.payload.items;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.total = action.payload.total;
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchStoryById.pending, (state) => {
        state.currentStatus = "loading";
      })
      .addCase(fetchStoryById.fulfilled, (state, action: PayloadAction<Story>) => {
        state.currentStatus = "succeeded";
        state.current = action.payload;
      })
      .addCase(fetchStoryById.rejected, (state, action) => {
        state.currentStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(createStory.fulfilled, (state, action: PayloadAction<Story>) => {
        state.items = [action.payload, ...state.items];
        state.total += 1;
      });
  },
});

export const { clearCurrent } = storiesSlice.actions;
export default storiesSlice.reducer;
