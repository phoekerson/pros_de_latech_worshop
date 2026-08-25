"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { ImagePlus, Upload } from "lucide-react";
import type { CreationCategory, MusicMood } from "@/lib/domain/types";
import { CATEGORY_LABELS, MOOD_LABELS } from "@/lib/domain/constants";
import { Button } from "@/components/ui/Button";

export default function UploadPage() {
  const { user } = useUser();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "photography" as CreationCategory,
    mood: "inspiring" as MusicMood,
    tags: "",
    imageUrl: "",
    imageHeight: 500,
    isVideo: false,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);

    const img = new window.Image();
    img.onload = () => {
      setForm((prev) => ({
        ...prev,
        imageUrl: url,
        imageHeight: img.height,
      }));
    };
    img.src = url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.imageUrl) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/creations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });

      if (res.ok) {
        router.push("/");
        router.refresh();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 md:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Publier une création</h1>
        <p className="mt-2 text-muted">
          Partage ton travail avec la communauté, {user?.firstName ?? "créateur"}.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass rounded-2xl p-6">
          <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border py-12 transition-colors hover:border-accent/50">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="Aperçu"
                className="max-h-64 rounded-lg object-contain"
              />
            ) : (
              <>
                <ImagePlus className="h-12 w-12 text-muted" />
                <span className="text-sm text-muted">
                  Glisse une image ou clique pour parcourir
                </span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="mb-1.5 block text-sm font-medium">
              Titre
            </label>
            <input
              id="title"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent"
              placeholder="Donne un titre à ta création"
            />
          </div>

          <div>
            <label htmlFor="description" className="mb-1.5 block text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent resize-none"
              placeholder="Décris ton inspiration..."
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="category" className="mb-1.5 block text-sm font-medium">
                Catégorie
              </label>
              <select
                id="category"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value as CreationCategory })
                }
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent"
              >
                {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="mood" className="mb-1.5 block text-sm font-medium">
                Ambiance musicale
              </label>
              <select
                id="mood"
                value={form.mood}
                onChange={(e) =>
                  setForm({ ...form, mood: e.target.value as MusicMood })
                }
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent"
              >
                {Object.entries(MOOD_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="tags" className="mb-1.5 block text-sm font-medium">
              Tags
            </label>
            <input
              id="tags"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent"
              placeholder="urbain, portrait, minimal (séparés par des virgules)"
            />
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.isVideo}
              onChange={(e) => setForm({ ...form, isVideo: e.target.checked })}
              className="rounded border-border"
            />
            Il s&apos;agit d&apos;une vidéo
          </label>
        </div>

        <Button
          type="submit"
          variant="accent"
          size="lg"
          disabled={isSubmitting || !form.title || !form.imageUrl}
          className="w-full"
        >
          <Upload className="h-4 w-4" />
          {isSubmitting ? "Publication..." : "Publier"}
        </Button>
      </form>
    </div>
  );
}
