"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import KitchenVideoCard from "./KitchenVideoCard";
import { Video } from "@/types/video.types";

interface KitchenVideoCarouselProps {
    videos: Video[];
}

import KitchenVideoModal from "./KitchenVideoModal";

export default function KitchenVideoCarousel({ videos }: KitchenVideoCarouselProps) {
    const [startIndex, setStartIndex] = useState(0);
    const [activeVideoIndex, setActiveVideoIndex] = useState(0);
    const [itemsToShow, setItemsToShow] = useState(7);
    const [isMobile, setIsMobile] = useState(false);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalVideoIndex, setModalVideoIndex] = useState(0);

    // Responsive logic
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setItemsToShow(2);
                setIsMobile(true);
            } else {
                setItemsToShow(7);
                setIsMobile(false);
            }
        };

        // Initial check
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Autoplay for active video (Video Playback Cycle)
    useEffect(() => {
        if (videos.length === 0 || isModalOpen) return; // Pause cycle if modal is open

        const interval = setInterval(() => {
            setActiveVideoIndex((prev) => (prev + 1) % videos.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [videos.length, isModalOpen]);

    // Mobile Auto-scroll
    useEffect(() => {
        if (!isMobile || videos.length === 0) return;

        const interval = setInterval(() => {
            setStartIndex((prev) => {
                // If we reach the end (or close to it where we can't show full items), loop back
                if (prev + itemsToShow >= videos.length) {
                    return 0;
                }
                return prev + 1;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [isMobile, itemsToShow, videos.length]);

    const next = () => {
        if (startIndex + itemsToShow < videos.length) {
            setStartIndex((prev) => prev + 1);
        }
    };

    const prev = () => {
        if (startIndex > 0) {
            setStartIndex((prev) => prev - 1);
        }
    };

    const isAtStart = startIndex === 0;
    const isAtEnd = startIndex + itemsToShow >= videos.length;

    // Modal Helpers
    const openModal = (index: number) => {
        setModalVideoIndex(index);
        setIsModalOpen(true);
    };

    const nextModalVideo = () => {
        setModalVideoIndex((prev) => (prev + 1) % videos.length);
    };

    const prevModalVideo = () => {
        setModalVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
    };

    return (
        <div className="relative w-full group p-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Yodha Kitchen
                </h2>
            </div>

            {/* Navigation Buttons (Center Left/Right) */}
            <button
                onClick={prev}
                disabled={isAtStart}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full border bg-white shadow-md transition-all duration-200 ${isAtStart
                    ? "border-gray-200 text-gray-300 cursor-not-allowed"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-zinc-800 dark:bg-zinc-900"
                    }`}
                aria-label="Previous videos"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={next}
                disabled={isAtEnd}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full border bg-white shadow-md transition-all duration-200 ${isAtEnd
                    ? "border-gray-200 text-gray-300 cursor-not-allowed"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-zinc-800 dark:bg-zinc-900"
                    }`}
                aria-label="Next videos"
            >
                <ChevronRight size={24} />
            </button>

            {/* Carousel Container */}
            <div className="overflow-hidden w-full">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${startIndex * (100 / itemsToShow)}%)`,
                    }}
                >
                    {videos.map((video, index) => (
                        <div
                            key={video._id}
                            className="shrink-0 px-1.5"
                            style={{ width: `${100 / itemsToShow}%` }}
                        >
                            <div className="aspect-9/16 w-full rounded-xl overflow-hidden relative">
                                <KitchenVideoCard
                                    video={video}
                                    onClick={() => openModal(index)}
                                    isPlaying={index === activeVideoIndex && !isModalOpen}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* MODAL */}
            <KitchenVideoModal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                video={videos[modalVideoIndex] || null}
                prevVideo={videos[(modalVideoIndex - 1 + videos.length) % videos.length] || null}
                nextVideo={videos[(modalVideoIndex + 1) % videos.length] || null}
                onNext={nextModalVideo}
                onPrev={prevModalVideo}
            />
        </div>
    );
}