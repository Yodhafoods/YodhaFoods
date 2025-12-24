"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Video } from "@/types/video.types";
import { X, ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/store/hooks";
import { addItemToCart } from "@/lib/store/features/cart/cartSlice";
import { toast } from "sonner";
import Image from "next/image";

interface KitchenVideoModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    video: Video | null;
    prevVideo: Video | null;
    nextVideo: Video | null;
    onNext: () => void;
    onPrev: () => void;
}

export default function KitchenVideoModal({
    open,
    setOpen,
    video,
    prevVideo,
    nextVideo,
    onNext,
    onPrev,
}: KitchenVideoModalProps) {
    const router = useRouter();
    const dispatch = useAppDispatch();

    // Touch Handling for Mobile Swipe
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null); // Reset
        setTouchStart(e.targetTouches[0].clientY);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientY);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isSwipeUp = distance > minSwipeDistance;
        const isSwipeDown = distance < -minSwipeDistance;

        if (isSwipeUp) {
            onNext();
        } else if (isSwipeDown) {
            onPrev();
        }
    };

    // Use specific handlers for clearer binding or rename above to handleTouchStart
    const handleTouchStart = onTouchStart;
    const handleTouchEnd = onTouchEnd;

    if (!open || !video) return null;

    const handleAddToCart = () => {
        const cartItem = {
            id: video.productId._id,
            name: video.productId.name,
            price: video.productId.price,
            qty: 1,
            image: video.productId.images?.[0]?.url || video.thumbnail?.url || video.video.url,
        };

        dispatch(addItemToCart({ product: cartItem, quantity: 1 }))
            .unwrap()
            .then(() => toast.success("Added to cart!"))
            .catch(() => toast.error("Failed to add to cart"));
    };

    const handleSeeMore = () => {
        setOpen(false);
        router.push(`/shop/${video.productId.slug}`);
    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/95 backdrop-blur-md" aria-hidden="true" />

            {/* Full Screen Container */}
            <div className="fixed inset-0 flex items-center justify-center p-4 w-full h-full">
                <Dialog.Panel className="w-full h-full max-w-[1600px] flex items-center justify-center relative outline-none">

                    {/* Close Button */}
                    <button
                        onClick={() => setOpen(false)}
                        className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all backdrop-blur-sm"
                    >
                        <X size={24} />
                    </button>

                    {/* ================= DESKTOP LAYOUT (Hidden on Mobile) ================= */}
                    <div className="hidden md:flex items-center justify-center w-full h-full gap-4 md:gap-12">

                        {/* LEFT: Previous Video Navigation */}
                        <div
                            className="flex flex-col items-center justify-center cursor-pointer group hover:scale-105 transition-all duration-300"
                            onClick={onPrev}
                        >
                            <div className="relative w-[140px] aspect-9/16 rounded-2xl overflow-hidden border-2 border-transparent group-hover:border-white/50 shadow-lg opacity-50 group-hover:opacity-100 transition-all">
                                {prevVideo ? (
                                    <>
                                        <img
                                            src={prevVideo.thumbnail?.url || prevVideo.video.url}
                                            alt="Previous"
                                            className="w-full h-full object-cover blur-[1px] group-hover:blur-0 transition-all"
                                        />
                                        {/* Arrow positioned at Left Edge */}
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-start pl-3">
                                            <div className="bg-white/90 text-black p-2 rounded-full shadow-xl transform group-hover:scale-110 transition-transform">
                                                <ChevronLeft size={24} strokeWidth={3} />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-500">No Video</div>
                                )}
                            </div>
                        </div>


                        {/* CENTER: ACTIVE CONTENT - SPLIT INTO TWO CARDS */}
                        <div className="flex flex-col md:flex-row items-center gap-6 max-h-[90vh]">

                            {/* 1. Video Player Card (Larger) */}
                            <div className="relative h-[60vh] md:h-[80vh] aspect-9/16 bg-black rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center shrink-0 border border-white/10">
                                <video
                                    src={video.video.url}
                                    className="w-full h-full object-cover"
                                    autoPlay
                                    loop
                                    muted={false}
                                    playsInline
                                />
                            </div>

                            {/* 2. Product Details Card (Smaller) */}
                            <div className="h-auto md:h-[65vh] md:aspect-9/16 bg-white dark:bg-zinc-900 rounded-3xl p-5 md:p-6 flex flex-col justify-center shrink-0 w-full md:w-auto shadow-xl border border-white/10 transition-all">

                                <div className="space-y-3">
                                    <div>
                                        <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white leading-tight">
                                            {video.productId.name}
                                        </h2>
                                        <p className="text-base md:text-lg font-bold text-orange-600 mt-1">
                                            ₹{video.productId.price}
                                        </p>
                                    </div>

                                    <div className="prose dark:prose-invert max-w-none text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                        <p className="line-clamp-6">{video.productId.description}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2.5 mt-5">
                                    <button
                                        onClick={handleAddToCart}
                                        className="w-full bg-[#3e5f35] hover:bg-[#2d4626] text-white py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-lg shadow-green-900/20"
                                    >
                                        <ShoppingBag size={16} />
                                        Add to Cart
                                    </button>

                                    <button
                                        onClick={handleSeeMore}
                                        className="w-full border border-gray-200 dark:border-zinc-600 text-gray-700 dark:text-gray-200 py-2.5 rounded-lg font-bold text-sm hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                                    >
                                        See More Details
                                    </button>
                                </div>
                            </div>

                        </div>

                        {/* RIGHT: Next Video Navigation */}
                        <div
                            className="hidden md:flex flex-col items-center justify-center cursor-pointer group hover:scale-105 transition-all duration-300"
                            onClick={onNext}
                        >
                            <div className="relative w-[140px] aspect-9/16 rounded-2xl overflow-hidden border-2 border-transparent group-hover:border-white/50 shadow-lg opacity-50 group-hover:opacity-100 transition-all">
                                {nextVideo ? (
                                    <>
                                        <img
                                            src={nextVideo.thumbnail?.url || nextVideo.video.url}
                                            alt="Next"
                                            className="w-full h-full object-cover blur-[1px] group-hover:blur-0 transition-all"
                                        />
                                        {/* Arrow positioned at Right Edge */}
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-end pr-3">
                                            <div className="bg-white/90 text-black p-2 rounded-full shadow-xl transform group-hover:scale-110 transition-transform">
                                                <ChevronRight size={24} strokeWidth={3} />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-500">No Video</div>
                                )}
                            </div>
                        </div>

                    </div>


                    {/* ================= MOBILE LAYOUT (Reel Style) ================= */}
                    <div
                        className="md:hidden fixed inset-0 z-40 bg-black flex flex-col"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        {/* 1. Full Screen Video */}
                        <div className="absolute inset-0">
                            <video
                                src={video.video.url}
                                className="w-full h-full object-cover"
                                autoPlay
                                loop
                                muted={false}
                                playsInline
                            />
                            {/* Dark Overlay for Text readability */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90 pointer-events-none" />
                        </div>

                        {/* 2. Top Controls */}
                        <div className="absolute top-4 right-4 z-50">
                            {/* Close Button is already handled by the parent 'absolute' close button, but let's ensure it's visible or add a specific one if needed.
                                The parent close button is: `absolute top-4 right-4 z-50`. Layout fits perfectly.
                             */}
                        </div>

                        {/* 3. Bottom Content (Overlay) */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 z-50 flex flex-col gap-4 pb-12">
                            <div className="space-y-1">
                                <h2 className="text-2xl font-bold text-white drop-shadow-md">
                                    {video.productId.name}
                                </h2>
                                <p className="text-xl font-bold text-orange-400 drop-shadow-md">
                                    ₹{video.productId.price}
                                </p>
                                {/* Short Description for Mobile */}
                                <p className="text-gray-200 text-sm line-clamp-2 drop-shadow-sm opacity-90">
                                    {video.productId.description}
                                </p>
                            </div>

                            <div className="flex gap-3 mt-2">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-[#3e5f35] hover:bg-[#2d4626] text-white py-3 rounded-xl font-bold text-sm shadow-lg backdrop-blur-sm flex items-center justify-center gap-2"
                                >
                                    <ShoppingBag size={18} />
                                    Add to Cart
                                </button>
                                <button
                                    onClick={handleSeeMore}
                                    className="flex-1 bg-white/20 hover:bg-white/30 text-white border border-white/30 py-3 rounded-xl font-bold text-sm backdrop-blur-md flex items-center justify-center"
                                >
                                    See Details
                                </button>
                            </div>
                        </div>

                        {/* Swipe Hint (Optional) */}
                        <div className="absolute left-1/2 bottom-2 -translate-x-1/2 z-40 animate-bounce opacity-50">
                            <div className="w-1 h-12 rounded-full bg-white/20"></div>
                        </div>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}