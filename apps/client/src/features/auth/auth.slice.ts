"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "@/lib/api";
import { getAdminLandingPath, normalizeRoles } from "./auth.utils";

export type AuthUser = {
  _id: string;
  name: string;
  email: string;
  roles: string[];
};

type AuthResponse = {
  user: AuthUser;
  accessToken: string;
};

type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  initialized: boolean;
};

const TOKEN_KEY = "token";

function saveToken(token: string) {
  if (typeof window !== "undefined") localStorage.setItem(TOKEN_KEY, token);
}

function clearToken() {
  if (typeof window !== "undefined") localStorage.removeItem(TOKEN_KEY);
}

function getStoredToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await api.post<AuthResponse>("/auth/register", payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.error ?? "Registration failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await api.post<AuthResponse>("/auth/login", payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.error ?? "Login failed");
    }
  }
);

export const fetchMe = createAsyncThunk("auth/fetchMe", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get<AuthUser>("/auth/me");
    return data;
  } catch {
    return rejectWithValue("Session expired");
  }
});

const initialState: AuthState = {
  user: null,
  accessToken: getStoredToken(),
  status: "idle",
  error: null,
  initialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.error = null;
      state.status = "idle";
      state.initialized = true;
      clearToken();
    },
    clearAuthError(state) {
      state.error = null;
    },
    setAuthInitialized(state) {
      state.initialized = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = { ...action.payload.user, roles: normalizeRoles(action.payload.user.roles) };
        state.accessToken = action.payload.accessToken;
        state.initialized = true;
        saveToken(action.payload.accessToken);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.payload ?? "Registration failed");
        state.initialized = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = { ...action.payload.user, roles: normalizeRoles(action.payload.user.roles) };
        state.accessToken = action.payload.accessToken;
        state.initialized = true;
        saveToken(action.payload.accessToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.payload ?? "Login failed");
        state.initialized = true;
      })
      .addCase(fetchMe.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = { ...action.payload, roles: normalizeRoles(action.payload.roles) };
        state.initialized = true;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.status = "idle";
        state.user = null;
        state.accessToken = null;
        state.initialized = true;
        clearToken();
      });
  },
});

export const { logout, clearAuthError, setAuthInitialized } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => Boolean(state.auth.user && state.auth.accessToken);
export const selectAdminLandingPath = (state: { auth: AuthState }) => getAdminLandingPath(state.auth.user?.roles);
