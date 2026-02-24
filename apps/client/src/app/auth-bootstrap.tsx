"use client";

import { useEffect } from "react";
import { fetchMe, setAuthInitialized } from "@/features/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function AuthBootstrap() {
  const dispatch = useAppDispatch();
  const { accessToken, initialized } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!initialized && accessToken) {
      dispatch(fetchMe());
      return;
    }

    if (!initialized && !accessToken) {
      dispatch(setAuthInitialized());
    }
  }, [accessToken, dispatch, initialized]);

  return null;
}
