"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Instagram, Youtube, Linkedin, ArrowRight } from "lucide-react";

const YodhaFamSection = () => {
    return (
        <div className="w-full bg-white pb-10 px-4 md:px-8 overflow-hidden">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Left Column: Text and Actions */}
                <div className="flex flex-col items-start gap-8 relative">
                    <div className="relative">
                        <h2 className="text-5xl md:text-6xl font-bold text-[#0f2f2b] tracking-tight leading-[1.1]">
                            Come, join <br /> the fam!
                        </h2>
                        <div
                            className={`absolute top-28 md:top-4 -right-0 md:-right-40 md:-right-48 rotate-[-12deg] text-2xl md:text-3xl text-[#b85c7c] leading-none`}
                            style={{ fontFamily: "var(--font-permanent-marker)" }}
                        >
                            GO <br /> TRUTH <br /> SEEKERS!
                        </div>
                    </div>

                    <div className="w-full h-px bg-gray-200 my-6"></div>

                    <div className="flex flex-col gap-4 w-full md:w-auto">
                        <Link
                            href="https://www.instagram.com/yodhafoods"
                            target="_blank"
                            className="flex items-center justify-between gap-3 px-6 py-3 rounded-full border border-[#6e2c38] text-[#6e2c38] hover:bg-[#6e2c38] hover:text-white transition-all duration-300 w-full md:w-fit group font-semibold"
                        >
                            <div className="flex items-center gap-2">
                                <Instagram size={20} />
                                <span>Join our Instagram Community</span>
                            </div>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                            <Link
                                href="https://www.youtube.com/@yodhafoods"
                                target="_blank"
                                className="flex items-center justify-between gap-2 px-6 py-3 rounded-full border border-[#6e2c38] text-[#6e2c38] hover:bg-[#6e2c38] hover:text-white transition-all duration-300 flex-1 md:flex-initial font-semibold group"
                            >
                                <div className="flex items-center gap-2">
                                    <Youtube size={20} />
                                    <span>YouTube</span>
                                </div>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link
                                href="https://www.linkedin.com/company/yodhafoods"
                                target="_blank"
                                className="flex items-center justify-between gap-2 px-6 py-3 rounded-full border border-[#6e2c38] text-[#6e2c38] hover:bg-[#6e2c38] hover:text-white transition-all duration-300 flex-1 md:flex-initial font-semibold group"
                            >
                                <div className="flex items-center gap-2">
                                    <Linkedin size={20} />
                                    <span>LinkedIn</span>
                                </div>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    <div className="mt-8 relative">
                        <div
                            className="text-4xl md:text-5xl text-[#b85c7c] leading-tight"
                            style={{ fontFamily: "var(--font-permanent-marker)" }}
                        >
                            BLEND THE BEST! <br />
                            <span className="text-3xl md:text-4xl">Stir the Health ♥</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Visuals and Testimonials */}
                <div className="flex flex-col gap-8 relative">
                    {/* Product Image */}
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
                        <Image
                            src="/yodha_product_pouch.png"
                            alt="Yodha Foods Bundle"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>

                    {/* Testimonials Swiper */}
                    <div className="w-full">
                        <Swiper
                            modules={[Autoplay]}
                            spaceBetween={20}
                            slidesPerView={1.2}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            loop={true}
                            breakpoints={{
                                640: { slidesPerView: 1.5 },
                                768: { slidesPerView: 2 },
                            }}
                            className="w-full"
                        >
                            <SwiperSlide>
                                <div className="bg-[#fceef5] p-6 rounded-xl flex flex-col gap-4 h-full min-h-[160px]">
                                    <p className="text-sm font-medium text-gray-800 line-clamp-3">
                                        "Shashank Mehta on removing Instagram from the marketing mix of The Whole Truth"
                                    </p>
                                    <div className="mt-auto flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-serif font-bold text-xl">F</div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider">Facts</p>
                                            <p className="text-[10px] text-gray-500">2 min read</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="bg-[#fce8b6] p-6 rounded-xl flex flex-col gap-4 h-full min-h-[160px]">
                                    <p className="text-sm font-medium text-gray-800 line-clamp-3">
                                        "TWT unmasks unhealthy food brands with Rohan Joshi"
                                    </p>
                                    <div className="mt-auto flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-[10px] p-1 text-center leading-none">ET</div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider">HEALTHEQUITY</p>
                                            <p className="text-[10px] text-gray-500">2 min read</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="bg-[#e6f3f0] p-6 rounded-xl flex flex-col gap-4 h-full min-h-[160px]">
                                    <p className="text-sm font-medium text-gray-800 line-clamp-3">
                                        "How clean label brands are changing the way we eat."
                                    </p>
                                    <div className="mt-auto flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-serif font-bold text-xl">Y</div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider">TRUTHLAB</p>
                                            <p className="text-[10px] text-gray-500">3 min read</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default YodhaFamSection;
