import { configureStore } from "@reduxjs/toolkit";
import stories from "@/features/story/slice";
import audioStories from "@/features/audio-stories/audio-stories.slice";
import videos from "@/features/videos/videos.slice"
import creativity from "@/features/creativity/creativity.slice";
export const store = configureStore({
  reducer: {
    stories,
    audioStories,
    videos,
    creativity
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
