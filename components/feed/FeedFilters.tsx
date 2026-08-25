"use client";

import type { CreationCategory, MusicMood } from "@/lib/domain/types";
import { CATEGORY_LABELS, MOOD_LABELS } from "@/lib/domain/constants";
import { cn } from "@/lib/utils/cn";

interface FeedFiltersProps {
  selectedCategory: CreationCategory | "all";
  selectedMood: MusicMood | "all";
  onCategoryChange: (category: CreationCategory | "all") => void;
  onMoodChange: (mood: MusicMood | "all") => void;
}

export function FeedFilters({
  selectedCategory,
  selectedMood,
  onCategoryChange,
  onMoodChange,
}: FeedFiltersProps) {
  const categories: (CreationCategory | "all")[] = [
    "all",
    ...Object.keys(CATEGORY_LABELS) as CreationCategory[],
  ];

  const moods: (MusicMood | "all")[] = [
    "all",
    ...Object.keys(MOOD_LABELS) as MusicMood[],
  ];

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              selectedCategory === cat
                ? "bg-accent text-black"
                : "bg-surface text-muted hover:text-foreground hover:bg-surface-elevated",
            )}
          >
            {cat === "all" ? "Tout" : CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-muted shrink-0">Ambiance :</span>
        <select
          value={selectedMood}
          onChange={(e) => onMoodChange(e.target.value as MusicMood | "all")}
          className="rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-foreground outline-none focus:border-accent"
        >
          {moods.map((mood) => (
            <option key={mood} value={mood}>
              {mood === "all" ? "Toutes" : MOOD_LABELS[mood]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
