import ConcernPageClient from "@/features/concerns/components/ConcernPageClient";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Shop by Concern | Yodha Foods",
    description: "Find natural food products curated for your specific health goals - Weight Loss, Heart Health, Diabetes, and more.",
};

export default function ShopByConcernPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
            {/* Hero Section */}
            <div className="p-4 md:p-6 pb-0">
                <div className="relative w-full h-[400px] md:h-[300px] rounded-3xl overflow-hidden shadow-xl">
                    <Image
                        src="/assets/images/shop-by-concern-hero.png"
                        alt="Healthy lifestyle with natural ingredients"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent">
                        <div className="container mx-auto px-6 h-full flex flex-col justify-center">
                            <div className="max-w-xl text-white space-y-4 pt-8">
                                <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                                    Nutrition, Guided by Your Concern
                                </h1>
                                <p className="text-lg md:text-xl text-gray-100 font-medium max-w-lg">
                                    Choose products based on what your body needs today
                                </p>
                                <Link
                                    href="#concerns"
                                    className="flex items-center gap-2 w-fit px-8 py-3 bg-white text-pink-400 font-bold rounded-full hover:bg-emerald-50 transition-colors duration-300 shadow-lg mt-4"
                                >
                                    Get Started <span className="ml-2"><ArrowRight /></span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="concerns">
                <ConcernPageClient
                    headerContent={null}
                    emptyState={
                        <div className="text-center py-12 bg-white/40 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-sm max-w-3xl mx-auto mt-4">
                            <p className="text-gray-500 text-xl font-light">No products found for this concern yet.</p>
                            <p className="text-gray-400 mt-2">Check back soon for new additions!</p>
                        </div>
                    }
                />
            </div>
        </div>
    );
}