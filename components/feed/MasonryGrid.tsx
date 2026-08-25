"use client";

import Masonry from "react-masonry-css";
import type { Creation } from "@/lib/domain/types";
import { CreationCard } from "./CreationCard";

interface MasonryGridProps {
  creations: Creation[];
  onCreationHover?: (creation: Creation | null) => void;
  onCreationClick?: (creation: Creation) => void;
}

const BREAKPOINTS = {
  default: 5,
  1920: 5,
  1536: 4,
  1280: 3,
  768: 2,
  640: 1,
};

export function MasonryGrid({
  creations,
  onCreationHover,
  onCreationClick,
}: MasonryGridProps) {
  return (
    <Masonry
      breakpointCols={BREAKPOINTS}
      className="masonry-grid"
      columnClassName="masonry-grid-column"
    >
      {creations.map((creation) => (
        <CreationCard
          key={creation.id}
          creation={creation}
          onHover={onCreationHover}
          onClick={onCreationClick}
        />
      ))}
    </Masonry>
  );
}
