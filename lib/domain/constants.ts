import type { CreationCategory, MusicMood } from "./types";

export const APP_NAME = "CréaFlow";

export const CATEGORY_LABELS: Record<CreationCategory, string> = {
  photography: "Photographie",
  illustration: "Illustration",
  video: "Vidéo",
  design: "Design",
  "3d": "3D",
  motion: "Motion",
};

export const MOOD_LABELS: Record<MusicMood, string> = {
  calm: "Calme",
  energetic: "Énergique",
  cinematic: "Cinématique",
  electronic: "Électronique",
  ambient: "Ambiant",
  inspiring: "Inspirant",
};

export const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/explore", label: "Explorer" },
  { href: "/upload", label: "Publier" },
] as const;
