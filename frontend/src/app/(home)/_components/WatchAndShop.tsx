import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import KitchenVideoCarousel from "@/features/kitchen/components/KitchenVideoCarousel";
import { getKitchenVideos } from "@/features/kitchen/services/kitchen.service";
import { Video } from "@/types/video.types";

import { cookies } from "next/headers";

export default async function WatchAndShop() {
    let videos: Video[] = [];

    try {
        const cookieStore = await cookies();
        const data = await getKitchenVideos({
            headers: {
                Cookie: cookieStore.toString(),
            },
        });
        videos = data.videos || [];
    } catch (err) {
        console.error("Failed to fetch kitchen videos:", err);
    }

    if (videos.length === 0) return null;

    return (
        <section className="mb-2 mt-12 relative group/section">
            <div className="flex justify-between items-baseline mb-2 px-1">
                <h2 className="flex group items-center gap-1 text-lg md:text-xl font-bold text-gray-900 tracking-tight cursor-pointer">Watch & Shop
                    <ChevronRight size={24} strokeWidth={3} className="text-gray-700 group-hover:text-orange-600 hover:text-orange-600 group-hover:translate-x-2 transition-all text-xl font-bold" /> </h2>
                <Link href="/kitchen" className="text-sm group font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 transition-colors">
                    View All <ArrowRight size={16} className=" group-hover:translate-x-2 transition-all" />
                </Link>
            </div>

            <KitchenVideoCarousel videos={videos} hideHeader={true} />
        </section>
    );
}
