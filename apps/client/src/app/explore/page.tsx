import { Suspense } from "react";
import ExplorePage from "./ExplorePage";

export default function Explore() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExplorePage/>
    </Suspense>
  )
} 