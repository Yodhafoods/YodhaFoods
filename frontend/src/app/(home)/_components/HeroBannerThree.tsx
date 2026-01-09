"use client";

import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { useDispatch } from "react-redux";
import { openDrawer } from "@/features/ui/store/uiSlice";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"] });
const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "600", "800"],
});

export default function HeroBannerThree() {
    const dispatch = useDispatch();

    return (
        <section className={`w-full flex justify-center ${jakarta.className}`}>
            <div className="max-w-[1440px] w-full px-2 md:px-12 mt-6">
                {/* 🔒 HEIGHT LOCKED FOR MOBILE + DESKTOP */}
                <div className="relative h-[490px] rounded-[40px] overflow-hidden bg-gradient-to-br from-[#f3d9c1] to-[#d97e5a] shadow-xl">

                    {/* INTRO */}
                    <div className="h-full flex items-center px-6 md:px-20">
                        <div>
                            <span className="text-xs font-extrabold tracking-widest uppercase opacity-60">
                                Molecular Nutrition
                            </span>

                            <h1 className={`${playfair.className} text-4xl md:text-6xl lg:text-7xl mt-4`}>
                                The Molecular <br /> Ritual
                            </h1>

                            <p className="max-w-lg mt-6 text-lg opacity-80">
                                Ditch the water weight. Build your 6-item ritual and unlock
                                clinically backed savings.
                            </p>

                            <button
                                onClick={() => dispatch(openDrawer("bundle"))}
                                className="mt-8 px-10 py-4 rounded-full bg-[#0f2f2b] text-white font-extrabold uppercase tracking-widest"
                            >
                                Start Your Ritual
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}