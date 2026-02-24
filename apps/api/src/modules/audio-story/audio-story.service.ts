import { AudioStory } from "./audio-story.model";

type ListAudioStoriesParams = {
  category?: string;
  q?: string;
  page?: number;
  limit?: number;
};

export async function listAudioStories(params: ListAudioStoriesParams) {
  const page = Math.max(params.page ?? 1, 1);
  const limit = Math.min(Math.max(params.limit ?? 12, 1), 50);
  const filter: any = { isPublic: true };

  if (params.category) filter.categories = params.category;
  if (params.q) filter.$text = { $search: params.q };

  const [items, total] = await Promise.all([
    AudioStory.find(filter)
      .sort({ plays: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select("-__v")
      .exec(),
    AudioStory.countDocuments(filter).exec(),
  ]);

  return {
    items,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
}

export async function incrementAudioStoryPlay(id: string) {
  await AudioStory.findByIdAndUpdate(id, { $inc: { plays: 1, views: 1 } });
  return { success: true };
}

export async function createAudioStory(payload: Record<string, unknown>) {
  return AudioStory.create(payload);
}
