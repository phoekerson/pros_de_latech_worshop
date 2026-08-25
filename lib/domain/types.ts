export type CreationCategory =
  | "photography"
  | "illustration"
  | "video"
  | "design"
  | "3d"
  | "motion";

export type MusicMood =
  | "calm"
  | "energetic"
  | "cinematic"
  | "electronic"
  | "ambient"
  | "inspiring";

export interface Creation {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  imageHeight: number;
  category: CreationCategory;
  mood: MusicMood;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  tags: string[];
  isVideo?: boolean;
  isHighlight?: boolean;
  createdAt: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  mood: MusicMood;
  audioUrl: string;
  coverUrl?: string;
}

export interface CreateCreationInput {
  title: string;
  description?: string;
  imageUrl: string;
  imageHeight: number;
  category: CreationCategory;
  mood: MusicMood;
  tags: string[];
  isVideo?: boolean;
}
