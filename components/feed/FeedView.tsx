"use client";

import { useMemo, useState } from "react";
import type { Creation, CreationCategory, MusicMood } from "@/lib/domain/types";
import { MasonryGrid } from "./MasonryGrid";
import { FeedFilters } from "./FeedFilters";
import { AmbientMusicPlayer } from "@/components/music/AmbientMusicPlayer";

interface FeedViewProps {
  creations: Creation[];
}

export function FeedView({ creations }: FeedViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<CreationCategory | "all">("all");
  const [selectedMood, setSelectedMood] = useState<MusicMood | "all">("all");
  const [hoveredMood, setHoveredMood] = useState<MusicMood | null>(null);

  const filteredCreations = useMemo(() => {
    return creations.filter((c) => {
      const matchCategory = selectedCategory === "all" || c.category === selectedCategory;
      const matchMood = selectedMood === "all" || c.mood === selectedMood;
      return matchCategory && matchMood;
    });
  }, [creations, selectedCategory, selectedMood]);

  const activeMood: MusicMood =
    hoveredMood ??
    (selectedMood !== "all" ? selectedMood : filteredCreations[0]?.mood ?? "ambient");

  return (
    <>
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Trouve ton inspiration
        </h1>
        <p className="text-muted max-w-2xl">
          Explore des créations de la communauté. La musique d&apos;ambiance s&apos;adapte
          au style que tu parcours.
        </p>
      </div>

      <FeedFilters
        selectedCategory={selectedCategory}
        selectedMood={selectedMood}
        onCategoryChange={setSelectedCategory}
        onMoodChange={setSelectedMood}
      />

      <div className="mt-8">
        {filteredCreations.length > 0 ? (
          <MasonryGrid
            creations={filteredCreations}
            onCreationHover={(creation) =>
              setHoveredMood(creation?.mood ?? null)
            }
          />
        ) : (
          <div className="flex min-h-[40vh] items-center justify-center rounded-2xl border border-border bg-surface">
            <p className="text-muted">Aucune création ne correspond à tes filtres.</p>
          </div>
        )}
      </div>

      <AmbientMusicPlayer mood={activeMood} />
    </>
  );
}
