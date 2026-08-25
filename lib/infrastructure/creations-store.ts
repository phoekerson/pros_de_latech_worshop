import type { Creation, CreateCreationInput } from "@/lib/domain/types";
import { MOCK_CREATIONS } from "@/lib/data/mock-creations";

let userCreations: Creation[] = [];

export const creationsStore = {
  getAll(): Creation[] {
    return [...MOCK_CREATIONS, ...userCreations].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  },

  create(input: CreateCreationInput & { authorId: string; authorName: string }): Creation {
    const creation: Creation = {
      id: crypto.randomUUID(),
      title: input.title,
      description: input.description,
      imageUrl: input.imageUrl,
      imageHeight: input.imageHeight,
      category: input.category,
      mood: input.mood,
      authorId: input.authorId,
      authorName: input.authorName,
      tags: input.tags,
      isVideo: input.isVideo,
      createdAt: new Date().toISOString(),
    };

    userCreations = [creation, ...userCreations];
    return creation;
  },
};
