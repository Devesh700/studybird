"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import AuthBootstrap from "./auth-bootstrap";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthBootstrap />
      {children}
    </Provider>
  );
}
