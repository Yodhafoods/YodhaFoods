"use client";

import { useEffect, useRef, useState } from "react";
import { motion, PanInfo, useReducedMotion } from "framer-motion";

import HeroBannerOne from "./HeroBannerOne";
import HeroBannerTwo from "./HeroBannerTwo";
import HeroBannerThree from "./HeroBannerThree";

const SLIDE_DURATION = 9000;
const SWIPE_THRESHOLD = 80;

const banners = [
    <HeroBannerOne key="one" />,
    <HeroBannerTwo key="two" />,
    <HeroBannerThree key="three" />,
];

export default function HeroCarousel() {
    const [index, setIndex] = useState(0);
    const [progressKey, setProgressKey] = useState(0);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const containerRef = useRef<HTMLElement | null>(null);

    const prefersReducedMotion = useReducedMotion();

    /* ---------------- HELPERS ---------------- */
    const restartProgress = () => setProgressKey((k) => k + 1);

    const stopAutoSlide = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    const startAutoSlide = () => {
        if (prefersReducedMotion) return;

        stopAutoSlide();
        intervalRef.current = setInterval(() => {
            setIndex((prev) => (prev + 1) % banners.length);
            restartProgress();
        }, SLIDE_DURATION);
    };

    /* ---------------- AUTOPLAY ---------------- */
    useEffect(() => {
        startAutoSlide();
        return stopAutoSlide;
    }, [prefersReducedMotion]);

    /* ---------------- VIEWPORT PAUSE ---------------- */
    useEffect(() => {
        if (!containerRef.current || prefersReducedMotion) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    startAutoSlide();
                } else {
                    stopAutoSlide();
                }
            },
            { threshold: 0.4 }
        );

        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, [prefersReducedMotion]);

    /* ---------------- SWIPE ---------------- */
    const handleDragEnd = (_: MouseEvent | TouchEvent, info: PanInfo) => {
        if (prefersReducedMotion) return;

        const offset = info.offset.x;

        if (offset < -SWIPE_THRESHOLD) {
            setIndex((i) => (i + 1) % banners.length);
        } else if (offset > SWIPE_THRESHOLD) {
            setIndex((i) => (i - 1 + banners.length) % banners.length);
        }

        restartProgress();
        startAutoSlide();
    };

    return (
        <section
            ref={containerRef}
            className="
        relative w-full 
        overflow-hidden 
        isolate           /* 🔑 clips banner shadows */
        touch-pan-y
      "
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
                transition={
                    prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.9, ease: [0.4, 0, 0.2, 1] }
                }
                style={{ willChange: "transform" }}
            >
                {banners.map((Banner, i) => (
                    <div key={i} className="w-full flex-shrink-0">
                        {Banner}
                    </div>
                ))}
            </motion.div>

            {/* DOTS + PROGRESS */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                {banners.map((_, i) => {
                    const active = i === index;

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
                            {active && !prefersReducedMotion && (
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
