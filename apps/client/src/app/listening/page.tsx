import { Suspense } from "react";
import ListeningPage from "./ListeningPage";

export default function Listening() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ListeningPage />
    </Suspense>
  )
}