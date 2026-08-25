import { NextResponse } from "next/server";
import type { CreateCreationInput } from "@/lib/domain/types";
import { creationsStore } from "@/lib/infrastructure/creations-store";

export async function GET() {
  const creations = creationsStore.getAll();
  return NextResponse.json(creations);
}

export async function POST(request: Request) {
  const body = (await request.json()) as CreateCreationInput;

  if (!body.title || !body.imageUrl) {
    return NextResponse.json(
      { error: "Titre et image requis" },
      { status: 400 },
    );
  }

  const creation = creationsStore.create({
    ...body,
    authorId: crypto.randomUUID(),
    authorName: "Créateur",
  });

  return NextResponse.json(creation, { status: 201 });
}
