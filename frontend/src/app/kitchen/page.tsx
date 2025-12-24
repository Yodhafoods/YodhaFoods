import { getKitchenVideos } from "../../services/kitchen.services";
import KitchenVideoCarousel from "../components/kitchen/KitchenVideoCarousel";
import { Video } from "@/types/video.types";

export default async function KitchenPage() {
  let videos: Video[] = [];

  try {
    const data = await getKitchenVideos();
    videos = data.videos || [];
  } catch (error) {
    console.error("Failed to fetch kitchen videos:", error);
  }

  /* EMPTY STATE */
  if (!videos.length) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-semibold mb-2">Yodha Kitchen 🍳</h1>
        <p className="text-gray-600 max-w-md">
          Fresh cooking videos showcasing our products will appear here soon.
        </p>

        <div className="mt-6 bg-gray-100 p-4 rounded-lg text-sm text-gray-500">
          No videos uploaded yet
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <h1 className="text-2xl font-semibold mb-2">Welcome to Yodha Kitchen 🍳</h1>
      <KitchenVideoCarousel videos={videos} />
    </div>
  );
}
