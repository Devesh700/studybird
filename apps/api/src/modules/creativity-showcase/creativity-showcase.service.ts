import { CreativityShowcase } from "./creativity-showcase.model";

type ListCreativityShowcasesParams = {
  skillCategory?: string;
  mediaType?: string;
  q?: string;
  page?: number;
  limit?: number;
};

export async function listCreativityShowcases(params: ListCreativityShowcasesParams) {
  const page = Math.max(params.page ?? 1, 1);
  const limit = Math.min(Math.max(params.limit ?? 12, 1), 50);
  const filter: any = { isPublic: true };

  if (params.skillCategory) filter.skillCategory = params.skillCategory;
  if (params.mediaType) filter.mediaType = params.mediaType;
  if (params.q) filter.$text = { $search: params.q };

  const [items, total] = await Promise.all([
    CreativityShowcase.find(filter)
      .sort({ applause: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select("-__v")
      .exec(),
    CreativityShowcase.countDocuments(filter).exec(),
  ]);

  return {
    items,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
}

export async function incrementCreativityApplause(id: string) {
  await CreativityShowcase.findByIdAndUpdate(id, { $inc: { applause: 1, views: 1 } });
  return { success: true };
}

export async function createCreativityShowcase(payload: Record<string, unknown>) {
  return CreativityShowcase.create(payload);
}
