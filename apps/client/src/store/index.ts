import { configureStore } from "@reduxjs/toolkit";
import stories from "@/features/story/slice";

export const store = configureStore({
  reducer: {
    stories,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
