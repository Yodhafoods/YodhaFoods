import { getKitchenVideos } from "../../services/kitchen.services";
import KitchenVideoCarousel from "../components/kitchen/KitchenVideoCarousel";
import { Video } from "@/types/video.types";
import Link from "next/link";
import { ChefHat, BookOpen, ArrowRight } from "lucide-react";
import { FaUtensils } from "react-icons/fa";

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
    <div className="py-8 px-4 md:px-6 max-w-7xl mx-auto">
      {/* Banner Cards Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Recipes Card */}
        <Link
          href="#recipes-section"
          className="group relative overflow-hidden rounded-2xl p-8 min-h-[200px] flex flex-col justify-center text-white transition-all hover:shadow-xl hover:translate-y-[-5px]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 opacity-90 transition-opacity group-hover:opacity-100" />
          <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
          <div className="absolute bottom-0 left-0 -ml-8 -mb-8 h-32 w-32 rounded-full bg-black/10 blur-2xl" />

          <div className="relative z-10 flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold mb-2">Yodha Recipes</h2>
              <p className="font-medium text-orange-100 text-lg">
                Explore our chef-curated delicious meals
              </p>
              <div className="mt-6 inline-flex items-center text-sm font-semibold bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm group-hover:bg-white/30 transition-colors w-fit">
                Watch Videos <span className="ml-2"><ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" /> </span>
              </div>
            </div>
            <ChefHat className="w-24 h-24 text-white/20 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
          </div>
        </Link>

        {/* Blogs Card */}
        <Link
          href="/blogs"
          className="group relative overflow-hidden rounded-2xl p-8 min-h-[200px] flex flex-col justify-center text-white transition-all hover:shadow-xl hover:translate-y-[-5px]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 opacity-90 transition-opacity group-hover:opacity-100" />
          <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
          <div className="absolute bottom-0 left-0 -ml-8 -mb-8 h-32 w-32 rounded-full bg-black/10 blur-2xl" />

          <div className="relative z-10 flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold mb-2">Healthy Blogs</h2>
              <p className="font-medium text-emerald-100 text-lg">
                Discover tips for a better lifestyle
              </p>
              <div className="mt-6 inline-flex items-center text-sm font-semibold bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm group-hover:bg-white/30 transition-colors w-fit">
                Read Articles <span className="ml-2"><ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" /> </span>
              </div>
            </div>
            <BookOpen className="w-24 h-24 text-white/20 transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300" />
          </div>
        </Link>
      </div>

      {/* Welcome Section */}
      <div className="text-center mb-16">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent  bg-linear-to-r from-orange-500 to-red-500">
          Welcome to Yodha Kitchen <span><FaUtensils size={24} className="inline-block ml-2" /></span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Experience the joy of cooking with our premium products and expert recipes.
        </p>
      </div>

      {/* Video Carousel Section */}
      <div id="recipes-section" className="scroll-mt-24">
        <div className="flex items-center gap-2 mb-6">
          <div className="h-8 w-1 bg-orange-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-800">Latest Kitchen Videos</h2>
        </div>
        <KitchenVideoCarousel videos={videos} />
      </div>
    </div>
  );
}
