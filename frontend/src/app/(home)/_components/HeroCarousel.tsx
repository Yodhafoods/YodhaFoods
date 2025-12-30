"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Import your Banner components
import HeroBannerOne from "./HeroBannerOne";
import HeroBannerTwo from "./HeroBannerTwo";
import HeroBannerThree from "./HeroBannerThree";
import HeroBannerFour from "./HeroBannerFour";

export default function HeroCarousel() {
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const swiperRef = useRef<SwiperType | null>(null);
    const progressCircle = useRef<SVGCircleElement>(null);
    const [isMounted, setIsMounted] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState(0);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    const onAutoplayTimeLeft = (s: SwiperType, time: number, progress: number) => {
        if (progressCircle.current) {
            // radius is roughly 8px -> circum ~ 50.
            // We'll set pathLength in CSS or attribute if possible, but let's use 100 for simplicity and dasharray.
            // Actually, let's just set CSS variable --progress
            progressCircle.current.style.setProperty('--progress', `${1 - progress}`);
        }
    };

    if (!isMounted) {
        return (
            <section className="w-full relative group flex justify-center h-[650px] bg-gray-100 rounded-[40px] animate-pulse">
                {/* Placeholder for SSR / Loading state */}
            </section>
        );
    }

    // Helper to handle dot click
    const handleDotClick = (index: number) => {
        swiperRef.current?.slideToLoop(index);
    };

    return (
        <section className="w-full relative group flex justify-center">
            {/* 
         WRAPPER: 
         Matches the layout of banners (max-w-[1440px]) but is purely for 
         positioning the navigation buttons perfectly inside the design boundaries.
         pointer-events-none allows clicks to pass through to the slider/banner content,
         except for the buttons themselves.
      */}
            <div className="absolute inset-0 z-20 flex justify-center pointer-events-none">
                <div className="max-w-[1440px] w-full px-2 md:px-12 mt-6 relative flex flex-col justify-between">

                    {/* NAVIGATION ARROWS ROW */}
                    <div className="flex items-center justify-between w-full h-full absolute inset-0 px-2 md:px-12">
                        {/* Custom PREV Button */}
                        <button
                            ref={prevRef}
                            onClick={() => swiperRef.current?.slidePrev()}
                            className="
              pointer-events-auto
              ml-4
              w-12 h-12 md:w-14 md:h-14
              rounded-full
              bg-white/10 backdrop-blur-md
              border border-white/20
              text-white
              flex items-center justify-center
              hover:bg-white/20 hover:scale-110
              transition-all duration-300
              shadow-lg
              group-hover:opacity-100 opacity-0
            "
                            aria-label="Previous Slide"
                        >
                            <FaChevronLeft className="text-xl md:text-2xl" />
                        </button>

                        {/* Custom NEXT Button */}
                        <button
                            ref={nextRef}
                            onClick={() => swiperRef.current?.slideNext()}
                            className="
              pointer-events-auto
              mr-4
              w-12 h-12 md:w-14 md:h-14
              rounded-full
              bg-white/10 backdrop-blur-md
              border border-white/20
              text-white
              flex items-center justify-center
              hover:bg-white/20 hover:scale-110
              transition-all duration-300
              shadow-lg
              group-hover:opacity-100 opacity-0
            "
                            aria-label="Next Slide"
                        >
                            <FaChevronRight className="text-xl md:text-2xl" />
                        </button>
                    </div>

                    {/* PROGRESS DOTS (Bottom Center) */}
                    <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 pointer-events-auto z-30">
                        {[0, 1, 2, 3].map((index) => (
                            <div
                                key={index}
                                onClick={() => handleDotClick(index)}
                                className="relative cursor-pointer flex items-center justify-center w-6 h-6"
                            >
                                {/* Background Dot */}
                                <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${index === activeIndex ? 'bg-transparent' : 'bg-white/40 hover:bg-white/80'}`} />

                                {/* Active Progress Ring */}
                                {index === activeIndex && (
                                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                                        {/* Track */}
                                        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
                                        {/* Progress */}
                                        <circle
                                            ref={progressCircle}
                                            cx="12" cy="12" r="10"
                                            stroke="#fbbf24" // amber-400
                                            strokeWidth="2"
                                            fill="none"
                                            strokeDasharray="62.83" // 2 * pi * 10
                                            strokeDashoffset="calc(62.83 * (1 - var(--progress, 0)))"
                                            strokeLinecap="round"
                                        />
                                        {/* Inner solid dot for active state */}
                                        <circle cx="12" cy="12" r="3" fill="#fbbf24" />
                                    </svg>
                                )}
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            <Swiper
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                modules={[Autoplay, Navigation]}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                speed={1000}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                // We use custom buttons calling API, but we can also link them via params
                // navigation={{
                //   prevEl: prevRef.current,
                //   nextEl: nextRef.current,
                // }}
                // However, since refs are null on first render, stick to instance methods or state-based refs.
                allowTouchMove={true}
                className="hero-swiper w-full"
            >
                <SwiperSlide>
                    <HeroBannerOne />
                </SwiperSlide>
                <SwiperSlide>
                    <HeroBannerTwo />
                </SwiperSlide>
                <SwiperSlide>
                    <HeroBannerThree />
                </SwiperSlide>
                <SwiperSlide>
                    <HeroBannerFour />
                </SwiperSlide>
            </Swiper>
        </section>
    );
}
