"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, PanInfo, useReducedMotion } from "framer-motion";

import HeroBannerOne from "./HeroBannerOne";
import HeroBannerTwo from "./HeroBannerTwo";
import HeroBannerThree from "./HeroBannerThree";
import HeroBannerFour from "./HeroBannerFour";

const SLIDE_DURATION = 9000;
const SWIPE_THRESHOLD = 80;
const TOTAL_SLIDES = 4;

export default function HeroCarousel() {
    const [index, setIndex] = useState(0);
    const [progressKey, setProgressKey] = useState(0);
    const [bannerTwoLocked, setBannerTwoLocked] = useState(false);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const containerRef = useRef<HTMLElement | null>(null);

    const prefersReducedMotion = useReducedMotion();

    /* ---------------- Helpers ---------------- */
    const restartProgress = useCallback(() => {
        setProgressKey((k) => k + 1);
    }, []);

    const stopAutoSlide = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const startAutoSlide = useCallback(() => {
        if (prefersReducedMotion) return;

        // ⛔ BannerTwo controls its own timing AFTER user interaction
        // if (index === 1 && bannerTwoLocked) return;
        if ((index === 2 || index === 3) && bannerTwoLocked) return;


        stopAutoSlide();
        intervalRef.current = setInterval(() => {
            setIndex((prev) => (prev + 1) % TOTAL_SLIDES);
            restartProgress();
        }, SLIDE_DURATION);
    }, [
        index,
        bannerTwoLocked,
        prefersReducedMotion,
        restartProgress,
        stopAutoSlide,
    ]);

    /* ---------------- Lifecycle ---------------- */
    useEffect(() => {
        startAutoSlide();
        return stopAutoSlide;
    }, [startAutoSlide, stopAutoSlide]);

    // Reset BannerTwo lock when leaving it
    useEffect(() => {
        if (index !== 2 && index !== 3) {
            setBannerTwoLocked(false);
        }

    }, [index]);

    /* ---------------- Swipe ---------------- */
    const handleDragEnd = useCallback(
        (_: MouseEvent | TouchEvent, info: PanInfo) => {
            if (prefersReducedMotion) return;

            if (info.offset.x < -SWIPE_THRESHOLD) {
                setIndex((i) => (i + 1) % TOTAL_SLIDES);
            } else if (info.offset.x > SWIPE_THRESHOLD) {
                setIndex((i) => (i - 1 + TOTAL_SLIDES) % TOTAL_SLIDES);
            }

            restartProgress();
            startAutoSlide();
        },
        [prefersReducedMotion, restartProgress, startAutoSlide]
    );

    return (
        <section
            ref={containerRef}
            className="relative w-full overflow-hidden isolate touch-pan-y"
            onMouseEnter={stopAutoSlide}
            onMouseLeave={startAutoSlide}
        >
            {/* SLIDES TRACK */}
            <motion.div
                className="flex w-full"
                drag={prefersReducedMotion ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.08}
                onDragStart={stopAutoSlide}
                onDragEnd={handleDragEnd}
                animate={{ x: `-${index * 100}%` }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.9 }}
            >
                <div className="w-full flex-shrink-0">
                    <HeroBannerThree />
                </div>
                <div className="w-full flex-shrink-0">
                    <HeroBannerOne />
                </div>
                <div className="w-full flex-shrink-0">
                    <HeroBannerFour
                        onUserInteracted={() => {
                            setBannerTwoLocked(true);
                            stopAutoSlide();
                        }}
                        onExpire={() => {
                            setBannerTwoLocked(false);
                            setIndex((i) => (i + 1) % TOTAL_SLIDES);
                            restartProgress();
                        }}
                    />
                </div>
                <div className="w-full flex-shrink-0">
                    <HeroBannerTwo
                        onUserInteracted={() => {
                            setBannerTwoLocked(true);
                            stopAutoSlide(); // 🔥 immediately stop auto-slide
                        }}
                        onExpire={() => {
                            setBannerTwoLocked(false);
                            setIndex((i) => (i + 1) % TOTAL_SLIDES);
                            restartProgress();
                        }}
                    />
                </div>
            </motion.div>

            {/* DOTS + PROGRESS */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                {Array.from({ length: TOTAL_SLIDES }).map((_, i) => {
                    const active = i === index;

                    // ❗ Hide progress ONLY for BannerTwo when timer is active
                    const showProgress = active && !(i === 1 && bannerTwoLocked);

                    return (
                        <button
                            key={i}
                            onClick={() => {
                                setIndex(i);
                                restartProgress();
                                startAutoSlide();
                            }}
                            className={`relative h-2 rounded-full overflow-hidden transition-all ${active ? "w-10 bg-white/30" : "w-2 bg-white/40"
                                }`}
                            aria-label={`Go to banner ${i + 1}`}
                        >
                            {showProgress && !prefersReducedMotion && (
                                <motion.span
                                    key={progressKey}
                                    className="absolute inset-0 bg-white"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    style={{ transformOrigin: "left" }}
                                    transition={{
                                        duration: SLIDE_DURATION / 1000,
                                        ease: "linear",
                                    }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
