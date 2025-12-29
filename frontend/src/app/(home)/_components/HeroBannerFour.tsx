"use client";

import { useState, useMemo, useEffect } from "react";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"] });
const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "600", "800"],
});

interface HeroBannerFourProps {
    onExpire?: () => void;
    onUserInteracted?: () => void;
}

const PRODUCTS = [
    { name: "Beetroot Powder", cat: "Vegetable" },
    { name: "Spinach Powder", cat: "Vegetable" },
    { name: "Carrot Powder", cat: "Vegetable" },
    { name: "Moringa Powder", cat: "Vegetable" },
    { name: "Mango Powder", cat: "Fruit" },
    { name: "Ginger Powder", cat: "Spice" },
    { name: "Turmeric Powder", cat: "Spice" },
];

const CATEGORIES = ["All", "Vegetable", "Fruit", "Spice"];

export default function HeroBannerFour({
    onExpire,
    onUserInteracted,
}: HeroBannerFourProps) {
    const [view, setView] = useState<"intro" | "builder">("intro");
    const [category, setCategory] = useState("All");
    const [query, setQuery] = useState("");
    const [box, setBox] = useState<string[]>([]);

    const [timerStarted, setTimerStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(180);
    const [hasExpired, setHasExpired] = useState(false);

    const filteredProducts = useMemo(() => {
        return PRODUCTS.filter(
            (p) =>
                (category === "All" || p.cat === category) &&
                p.name.toLowerCase().includes(query.toLowerCase())
        );
    }, [category, query]);

    useEffect(() => {
        if (!timerStarted) return;
        const id = setInterval(() => {
            setTimeLeft((t) => Math.max(t - 1, 0));
        }, 1000);
        return () => clearInterval(id);
    }, [timerStarted]);

    useEffect(() => {
        if (timeLeft === 0 && !hasExpired) {
            setHasExpired(true);
            onExpire?.();
        }
    }, [timeLeft, hasExpired, onExpire]);

    const startTimerOnce = () => {
        if (!timerStarted) {
            setTimerStarted(true);
            onUserInteracted?.();
        }
    };

    const formatTime = (s: number) =>
        `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60)
            .toString()
            .padStart(2, "0")}`;

    const toggleProduct = (name: string) => {
        startTimerOnce();
        setBox((prev) =>
            prev.includes(name)
                ? prev.filter((p) => p !== name)
                : prev.length < 6
                    ? [...prev, name]
                    : prev
        );
    };

    const removeFromBox = (i: number) => {
        startTimerOnce();
        setBox((prev) => prev.filter((_, idx) => idx !== i));
    };

    return (
        <section className={`w-full flex justify-center ${jakarta.className}`}>
            <div className="max-w-[1440px] w-full px-2 md:px-12 mt-6">
                {/* 🔒 HEIGHT LOCKED FOR MOBILE + DESKTOP */}
                <div className="relative h-[650px] rounded-[40px] overflow-hidden bg-gradient-to-br from-[#f3d9c1] to-[#d97e5a] shadow-xl">

                    {/* TIMER */}
                    {timerStarted && (
                        <div className="absolute top-4 right-4 z-30 px-4 py-2 rounded-full bg-black/60 backdrop-blur text-yellow-300 text-xs font-extrabold tracking-widest">
                            {formatTime(timeLeft)}
                        </div>
                    )}

                    {/* INTRO */}
                    {view === "intro" && (
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
                                    onClick={() => {
                                        startTimerOnce();
                                        setView("builder");
                                    }}
                                    className="mt-8 px-10 py-4 rounded-full bg-[#0f2f2b] text-white font-extrabold uppercase tracking-widest"
                                >
                                    Start Your Ritual
                                </button>
                            </div>
                        </div>
                    )}

                    {/* BUILDER */}
                    {view === "builder" && (
                        <div className="h-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] overflow-hidden">
                            {/* LEFT — scrolls internally */}
                            <div className="p-4 md:p-10 bg-white/30 overflow-y-auto">
                                <input
                                    value={query}
                                    onChange={(e) => {
                                        startTimerOnce();
                                        setQuery(e.target.value);
                                    }}
                                    placeholder="Search product"
                                    className="w-full mb-3 px-6 py-3 rounded-full bg-white"
                                />

                                <div className="flex gap-2 mb-3 overflow-x-auto">
                                    {CATEGORIES.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => {
                                                startTimerOnce();
                                                setCategory(cat);
                                            }}
                                            className={`px-4 py-2 rounded-full text-sm ${category === cat
                                                    ? "bg-[#0f2f2b] text-white"
                                                    : "bg-white"
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {filteredProducts.map((p) => (
                                        <button
                                            key={p.name}
                                            onClick={() => toggleProduct(p.name)}
                                            className={`p-3 rounded-xl ${box.includes(p.name)
                                                    ? "bg-[#27ae60] text-white scale-95"
                                                    : "bg-white"
                                                }`}
                                        >
                                            <strong className="text-sm">{p.name}</strong>
                                            <div className="text-[10px] opacity-60">{p.cat}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* RIGHT — scroll-safe */}
                            <div className="p-4 md:p-10 bg-[#0f2f2b] text-white flex flex-col items-center overflow-y-auto">
                                <h2 className="text-lg font-bold mb-3">Your Ritual Box</h2>

                                <div className="grid grid-cols-2 gap-3 w-full max-w-sm mb-4">
                                    {Array.from({ length: 6 }).map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => removeFromBox(i)}
                                            className={`h-20 md:h-24 rounded-xl ${box[i] ? "bg-white/40" : "bg-white/10"
                                                }`}
                                        >
                                            {box[i] || i + 1}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}
