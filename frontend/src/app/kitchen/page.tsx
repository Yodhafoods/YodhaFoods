import { getKitchenVideos } from "@/features/kitchen/services/kitchen.service";
import KitchenVideoCarousel from "@/features/kitchen/components/KitchenVideoCarousel";
import { Video } from "@/types/video.types";
import KitchenClient from "./KitchenClient";
import KitchenBanner from "@/features/kitchen/components/KitchenBanner";

export const dynamic = "force-dynamic";

export default async function KitchenPage() {
  let videos: Video[] = [];

  try {
    const data = await getKitchenVideos();
    videos = data.videos || [];
  } catch (err) {
    console.error(err);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* HERO */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#2d4a22] tracking-tight">
          Yodha Kitchen
        </h1>
        <p className="text-gray-600 mt-1 text-lg">
          Ultra-fast recipes for the Modern lifestyle
        </p>
      </div>

      {/* CLIENT UI */}
      <KitchenClient />

      {/* VIDEO CAROUSEL (UNCHANGED) */}
      <div id="recipes-section" className="scroll-mt-24">
        <div className="flex items-center gap-2 mb-6">
          <div className="h-8 w-1 bg-orange-500 rounded-full" />
          <h2 className="text-2xl font-bold text-gray-800">
            Latest Kitchen Videos
          </h2>
        </div>

        <KitchenVideoCarousel videos={videos} />
      </div>

      <KitchenBanner />
    </div>
  );
}
