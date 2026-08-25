import { FeedView } from "@/components/feed/FeedView";
import { creationsStore } from "@/lib/infrastructure/creations-store";

export default function ExplorePage() {
  const creations = creationsStore.getAll();

  return (
    <div className="mx-auto max-w-[1920px] px-4 py-8 md:px-8 md:py-12">
      <FeedView creations={creations} />
    </div>
  );
}
