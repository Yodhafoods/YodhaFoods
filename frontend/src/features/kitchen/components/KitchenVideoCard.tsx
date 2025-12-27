"use client";

import { useEffect, useRef } from "react";
import { Video } from "@/types/video.types";
import { Play, ShoppingCart, Info, ExternalLink } from "lucide-react";
import { useAppDispatch } from "@/lib/store/hooks";
import { addItemToCart } from "@/features/cart/store/cartSlice";
import { useRouter } from "next/navigation";

export default function KitchenVideoCard({
    video,
    onClick,
    isPlaying
}: {
    video: Video;
    onClick: () => void;
    isPlaying: boolean;
}) {
    const videoRef = useRef<HTMLVideoElement>(null);

    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.currentTime = 0; // Optional: restart video on play
            videoRef.current.play().catch(() => { });
        } else {
            videoRef.current.pause();
            videoRef.current.currentTime = 0; // Reset when stopped
        }
    }, [isPlaying]);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();

        console.log('Adding to cart:', video.productId);

        const cartItem = {
            id: video.productId._id,
            name: video.productId.name,
            price: video.productId.price,
            qty: 1,
            image: video.productId.images?.[0]?.url || video.thumbnail?.url || video.video.url,
        };

        dispatch(addItemToCart({ product: cartItem, quantity: 1 }))
            .unwrap()
            .then(() => {
                console.log("Added to cart successfully");
            })
            .catch((err) => {
                console.error("Failed to add to cart:", err);
            });
    };

    const handleNavigateToProduct = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.push(`/shop/${video.productId.slug}`);
    };

    return (
        <>
            <div
                className="relative h-full w-full bg-black group cursor-pointer overflow-hidden"
                onClick={onClick}
            >
                {/* VIDEO */}
                <video
                    ref={videoRef}
                    src={video.video.url}
                    muted
                    playsInline
                    className={`h-full w-full object-cover transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
                />

                {/* THUMBNAIL (Visible when not playing) */}
                {!isPlaying && (
                    <img
                        src={video.thumbnail?.url || video.video.url} // Fallback to video url if thumbnail missing, though might not work for all video urls as img
                        alt={video.title}
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                )}

                {/* CENTER PLAY BUTTON (Visible when not playing) */}
                {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full border border-white/50 text-white">
                            <Play fill="white" size={24} />
                        </div>
                    </div>
                )}

                {/* PRODUCT CARD OVERLAY */}
                <div className="absolute bottom-4 left-3 right-3 bg-white dark:bg-zinc-900 rounded-lg p-3 shadow-lg flex flex-col gap-3 transition-transform duration-300 translate-y-2 group-hover:translate-y-0">

                    {/* Top Row: Thumbnail + Info */}
                    <div className="flex gap-3 items-start">

                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm truncate leading-tight">
                                {video.productId.name}
                            </h3>
                            <p className="text-gray-900 dark:text-gray-200 text-sm font-semibold mt-0.5">
                                ₹{video.productId.price}
                            </p>
                        </div>
                        {/* Info Icon */}
                        <button className="text-gray-400 hover:text-gray-600">
                            <Info size={18} />
                        </button>
                    </div>

                    {/* Bottom Row: Buttons */}
                    <div className="flex gap-2">
                        <button
                            className="flex gap-2 px-2 md:px-3 items-center justify-center flex-1 bg-[#3e5f35] hover:bg-[#2d4626] text-white py-2 rounded text-xs font-bold uppercase tracking-wide transition-colors"
                            onClick={handleAddToCart}
                        >
                            <ShoppingCart size={16} /> Add
                        </button>
                        <button
                            className="bg-[#3e5f35] hover:bg-[#2d4626] text-white p-2 rounded transition-colors"
                            onClick={handleNavigateToProduct}
                        >
                            <ExternalLink size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
