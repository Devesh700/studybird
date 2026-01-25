"use client";

export default function Error({ error }: { error: any }) {
  return (
    <div className="rounded-md border p-4 text-sm text-red-600">
      Failed to load stories: {error?.message}
    </div>
  );
}
