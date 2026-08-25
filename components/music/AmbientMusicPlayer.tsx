"use client";

import { useEffect, useRef, useState } from "react";
import { Music2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import type { MusicMood } from "@/lib/domain/types";
import { MOOD_LABELS } from "@/lib/domain/constants";
import { MUSIC_TRACKS } from "@/lib/data/mock-creations";
import { cn } from "@/lib/utils/cn";

interface AmbientMusicPlayerProps {
  mood: MusicMood;
  enabled?: boolean;
}

export function AmbientMusicPlayer({ mood, enabled = true }: AmbientMusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.4);

  const track = MUSIC_TRACKS.find((t) => t.mood === mood) ?? MUSIC_TRACKS[0];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = track.audioUrl;
    audio.load();

    if (isPlaying && enabled) {
      void audio.play().catch(() => setIsPlaying(false));
    }
  }, [track.audioUrl, isPlaying, enabled]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      void audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <div className="glass fixed bottom-6 left-1/2 z-40 flex w-[min(420px,calc(100vw-2rem))] -translate-x-1/2 items-center gap-3 rounded-2xl px-4 py-3 shadow-2xl">
      <audio ref={audioRef} loop preload="none" />

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/20">
        <Music2 className="h-5 w-5 text-accent" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{track.title}</p>
        <p className="truncate text-xs text-muted">
          Ambiance {MOOD_LABELS[mood]} · {track.artist}
        </p>
      </div>

      <button
        onClick={togglePlay}
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors",
          isPlaying ? "bg-accent text-black" : "bg-white/10 text-white hover:bg-white/20",
        )}
        aria-label={isPlaying ? "Pause" : "Lecture"}
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
      </button>

      <button
        onClick={() => setIsMuted(!isMuted)}
        className="text-muted hover:text-foreground transition-colors"
        aria-label={isMuted ? "Activer le son" : "Couper le son"}
      >
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>
    </div>
  );
}
