"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import type { Creation } from "@/lib/domain/types";
import { CATEGORY_LABELS } from "@/lib/domain/constants";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";

interface CreationCardProps {
  creation: Creation;
  onHover?: (creation: Creation | null) => void;
  onClick?: (creation: Creation) => void;
  className?: string;
}

export function CreationCard({
  creation,
  onHover,
  onClick,
  className,
}: CreationCardProps) {
  return (
    <article
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-xl bg-surface animate-fade-in",
        className,
      )}
      onMouseEnter={() => onHover?.(creation)}
      onMouseLeave={() => onHover?.(null)}
      onClick={() => onClick?.(creation)}
    >
      <div className="relative w-full" style={{ aspectRatio: `600 / ${creation.imageHeight}` }}>
        <Image
          src={creation.imageUrl}
          alt={creation.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {creation.isVideo && (
          <div className="absolute right-3 top-3">
            <Badge variant="video">
              <Play className="mr-1 inline h-3 w-3" />
              Vidéo
            </Badge>
          </div>
        )}

        {creation.isHighlight && (
          <div className="absolute left-3 top-3">
            <Badge variant="accent">Highlight</Badge>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <h3 className="text-sm font-semibold text-white">{creation.title}</h3>
          <div className="mt-1 flex items-center justify-between">
            <p className="text-xs text-zinc-300">{creation.authorName}</p>
            <span className="text-xs text-accent">
              {CATEGORY_LABELS[creation.category]}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
