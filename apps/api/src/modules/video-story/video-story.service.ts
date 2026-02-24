import { VideoStory } from "./video-story.model";

type ListVideoStoriesParams = {
  category?: string;
  q?: string;
  page?: number;
  limit?: number;
};

export async function listVideoStories(params: ListVideoStoriesParams) {
  const page = Math.max(params.page ?? 1, 1);
  const limit = Math.min(Math.max(params.limit ?? 12, 1), 50);
  const filter: any = { isPublic: true };

  if (params.category) filter.categories = params.category;
  if (params.q) filter.$text = { $search: params.q };

  const [items, total] = await Promise.all([
    VideoStory.find(filter)
      .sort({ views: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select("-__v")
      .exec(),
    VideoStory.countDocuments(filter).exec(),
  ]);

  return {
    items,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
}

export async function incrementVideoStoryView(id: string) {
  await VideoStory.findByIdAndUpdate(id, { $inc: { views: 1 } });
  return { success: true };
}

export async function createVideoStory(payload: Record<string, unknown>) {
  return VideoStory.create(payload);
}
