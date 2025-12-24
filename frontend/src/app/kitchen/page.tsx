"use client";

import { useEffect, useState } from "react";
import KitchenVideoReel from "../components/KitchenVideoCard";

export default function KitchenPage() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/videos/kitchen`,
          { cache: "no-store" }
        );
        const data = await res.json();
        const text = await res.text();
        console.log(text);
        setVideos(data.videos || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  /* 1️⃣ LOADING STATE */
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading kitchen videos...</p>
      </div>
    );
  }

  /* 2️⃣ EMPTY STATE (NO VIDEOS) */
  if (videos.length === 0) {
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

  /* 3️⃣ NORMAL VIDEO FEED */
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      {videos.map((video) => (
        <KitchenVideoReel key={video._id} video={video} />
      ))}
    </div>
  );
}
