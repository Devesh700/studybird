import type { RootState } from "@/store";
import { getAdminLandingPath, isAdminRole } from "./auth.utils";

export const selectAuthState = (state: RootState) => state.auth;
export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectAuthInitialized = (state: RootState) => state.auth.initialized;
export const selectIsAuthenticated = (state: RootState) => Boolean(state.auth.user && state.auth.accessToken);
export const selectIsAdmin = (state: RootState) => isAdminRole(state.auth.user?.roles);
export const selectAdminLandingPath = (state: RootState) => getAdminLandingPath(state.auth.user?.roles);
