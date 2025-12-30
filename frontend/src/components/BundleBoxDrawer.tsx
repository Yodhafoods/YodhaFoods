"use client";

import React, { useState, useEffect } from "react";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { openDrawer, closeDrawer } from "@/features/ui/store/uiSlice";

// Font configurations
const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "600", "800"],
    variable: "--font-jakarta"
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "700"],
    style: ["normal", "italic"],
    variable: "--font-playfair"
});

// Products Data
const PRODUCTS = [
    { name: "Beetroot Powder", cat: "Vegetable" },
    { name: "Spinach Powder", cat: "Vegetable" },
    { name: "Carrot Powder", cat: "Vegetable" },
    { name: "Onion Powder", cat: "Vegetable" },
    { name: "Mango Powder", cat: "Fruit" },
    { name: "Strawberry Powder", cat: "Fruit" },
    { name: "Ginger Powder", cat: "Spice" },
    { name: "Turmeric Powder", cat: "Spice" },
    { name: "Garlic Powder", cat: "Spice" },
];

export default function BundleBoxDrawer() {
    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.ui.isDrawerOpen);
    const [viewState, setViewState] = useState<"banner" | "bundler" | "report">("banner");

    // Logic State
    const [box, setBox] = useState<string[]>([]);
    const [currentCat, setCurrentCat] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    // Timer State
    const [timeLeft, setTimeLeft] = useState(540);
    const [timerActive, setTimerActive] = useState(false);

    // Analysis State
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showReportContent, setShowReportContent] = useState(false);

    // -- Effects --

    // Body scroll lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Timer
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timerActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timerActive, timeLeft]);

    // -- Handlers --

    const toggleDrawer = () => {
        if (isOpen) {
            dispatch(closeDrawer());
        } else {
            dispatch(openDrawer());
        }
        if (!isOpen && !timerActive) {
            // Logic for opening
        }
    };

    const startRitual = () => {
        setViewState("bundler");
        if (!timerActive) {
            setTimerActive(true);
        }
    };

    const toggleProduct = (name: string) => {
        if (box.includes(name)) {
            setBox(box.filter((n) => n !== name));
        } else if (box.length < 6) {
            setBox([...box, name]);
        }
    };

    const removeProduct = (index: number) => {
        if (box[index]) {
            const newBox = [...box];
            newBox.splice(index, 1);
            setBox(newBox);
        }
    };

    const clearAll = () => {
        setBox([]);
        setViewState("bundler");
        setShowReportContent(false);
        setIsAnalyzing(false);
    };

    const resetSelection = () => {
        setBox([]);
    }

    const runAnalysis = () => {
        setViewState("report");
        setIsAnalyzing(true);
        setShowReportContent(false);

        // Simulate delay
        setTimeout(() => {
            setIsAnalyzing(false);
            setShowReportContent(true);
        }, 2500);
    };

    const editBundle = () => {
        setViewState("bundler");
        setIsAnalyzing(false);
        setShowReportContent(false);
    };

    // -- Render Helpers --

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    const filteredProducts = PRODUCTS.filter(
        (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (currentCat === "All" || p.cat === currentCat)
    );

    return (
        <div className={`${jakarta.variable} ${playfair.variable} font-sans`}>
            {/* Floating Button */}
            {!isOpen && (
                <div className="fixed bottom-8 right-8 z-[9999]">
                    <button
                        onClick={() => dispatch(openDrawer())}
                        className="w-[60px] h-[60px] rounded-full bg-[#0f2f2b] text-[#d4af37] border border-[#d4af37] flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-all duration-300"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                            <line x1="12" y1="22.08" x2="12" y2="12"></line>
                        </svg>
                    </button>
                </div>
            )}

            {/* Drawer Overlay */}
            <div
                className={`fixed inset-0 z-[10000] flex justify-center items-end transition-all duration-500 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
                style={{ top: isOpen ? '0' : '100%' }} // Simple slide logic or use transform
            >
                {/* Actual Slide Container to control transform */}
                <div
                    className={`w-full h-full md:h-[90vh] max-w-[1800px] relative transition-transform duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)] transform ${isOpen ? "translate-y-0" : "translate-y-full"}`}
                >
                    {/* Main Container Card */}
                    <main className="w-full h-full flex flex-col md:flex-row bg-gradient-to-br from-[#f3d9c1] via-[#d97e5a] to-[#d97e5a] md:rounded-t-[60px] overflow-hidden border border-white/40 shadow-2xl relative">

                        {/* Close Button & HUD (Absolute) */}
                        <button
                            onClick={() => dispatch(closeDrawer())}
                            className="absolute top-4 right-4 z-50 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-[#0f2f2b] hover:scale-110 transition-transform shadow-md"
                        >
                            ✕
                        </button>

                        {viewState !== 'banner' && (
                            <div className="absolute top-4 right-16 md:right-20 z-50 bg-[#0f2f2b]/90 backdrop-blur-md px-4 py-2 rounded-full border border-[#d4af37] text-white flex items-center gap-3 shadow-lg">
                                <span className="text-xs md:text-sm">Protocol Active</span>
                                <span className="text-xs md:text-sm font-extrabold text-[#d4af37]">
                                    {formatTime(timeLeft)}
                                </span>
                            </div>
                        )}


                        {/* 1. Banner View */}
                        {viewState === "banner" && (
                            <section className="w-full h-full flex flex-col md:flex-row md:items-center relative p-8 md:p-20">
                                <div className="flex flex-col justify-center z-10 text-center md:text-left">
                                    <span className="tracking-[5px] font-extrabold text-[#0f2f2b]/60 mb-5 text-xs md:text-sm">
                                        MOLECULAR NUTRITION
                                    </span>
                                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-[#0f2f2b] mb-6">
                                        Bundle<br />The Box.
                                    </h1>
                                    <p className="text-lg md:text-xl text-[#0f2f2b]/80 mb-8 max-w-[500px] leading-relaxed mx-auto md:mx-0">
                                        Ditch the water weight. Build your 6-item ritual and unlock
                                        clinical-grade savings.
                                    </p>
                                    <button
                                        onClick={startRitual}
                                        className="bg-[#0f2f2b] text-white py-4 px-10 rounded-full font-extrabold uppercase shadow-lg hover:-translate-y-1 transition-transform w-fit mx-auto md:mx-0 text-sm md:text-base"
                                    >
                                        Start Your Ritual
                                    </button>
                                </div>
                                {/* Decorative Leaf */}
                                <div className="absolute -right-10 -bottom-10 opacity-10 text-[#0f2f2b] pointer-events-none">
                                    <svg width="300" height="300" viewBox="0 0 24 24" fill="currentColor" className="md:w-[500px] md:h-[500px]">
                                        <path d="M17,8C8,10,5.9,16.17,3.82,21.34L5.71,22l1-2.3A4.49,4.49,0,0,0,8,20C19,20,22,3,22,3,21,5,14,5.25,9,6.25S2,11.5,2,13.5a6.22,6.22,0,0,0,1.75,3.75C7,8,17,8,17,8Z" />
                                    </svg>
                                </div>
                            </section>
                        )}

                        {/* 2. Bundler View (Grid + Sidebar) */}
                        {(viewState === "bundler" || viewState === 'report') && (
                            <section className={`w-full h-full flex flex-col md:grid md:grid-cols-[1.1fr_0.9fr] overflow-hidden ${viewState === 'bundler' || viewState === 'report' ? 'flex' : 'hidden'}`}>

                                {/* LEFT: Selection Pane */}
                                <div className="h-1/2 md:h-full p-4 md:p-8 bg-white/15 overflow-y-auto no-scrollbar scroll-smooth">
                                    <input
                                        type="text"
                                        className="w-full py-2 px-4 md:py-3 md:px-6 rounded-full border border-black/10 mb-4 md:mb-6 text-sm outline-none bg-white/80 focus:bg-white transition-colors"
                                        placeholder="Search product..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />

                                    <div className="flex gap-2 overflow-x-auto mb-4 md:mb-6 no-scrollbar pb-2 shrink-0">
                                        {["All", "Vegetable", "Fruit", "Spice"].map(cat => (
                                            <div
                                                key={cat}
                                                onClick={() => setCurrentCat(cat)}
                                                className={`px-4 py-2 rounded-full text-[0.7rem] md:text-xs font-bold cursor-pointer whitespace-nowrap transition-colors ${currentCat === cat
                                                    ? "bg-[#0f2f2b] text-white"
                                                    : "bg-white text-[#0f2f2b] hover:bg-white/80"
                                                    }`}
                                            >
                                                {cat === "All" ? "All Items" : cat + "s"}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                                        {filteredProducts.map((p) => {
                                            const isAdded = box.includes(p.name);
                                            return (
                                                <div
                                                    key={p.name}
                                                    onClick={() => toggleProduct(p.name)}
                                                    className={`p-3 md:p-4 rounded-3xl text-center cursor-pointer transition-all border-2 border-transparent relative hover:shadow-md ${isAdded
                                                        ? "bg-[#27ae60] text-white scale-95"
                                                        : "bg-white hover:bg-white/90"
                                                        }`}
                                                >
                                                    <h4 className="text-[0.7rem] md:text-sm font-bold mb-1 leading-tight">{p.name}</h4>
                                                    <p className={`text-[0.5rem] md:text-[0.6rem] uppercase tracking-wider ${isAdded ? "opacity-80" : "opacity-50"}`}>
                                                        {p.cat}
                                                    </p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* RIGHT: Box Pane */}
                                <div className="h-1/2 md:h-full p-4 md:p-8 bg-[#0f2f2b] flex flex-col items-center justify-center relative border-t md:border-t-0 border-white/10 shrink-0 overflow-y-auto no-scrollbar">
                                    <h2 className="text-[#d4af37] font-serif text-2xl md:text-3xl mb-1 text-center shrink-0">
                                        Your Ritual
                                    </h2>
                                    <p className="text-white/40 text-[0.6rem] tracking-[2px] mb-4 text-center uppercase shrink-0">
                                        ADD 6 ITEMS TO ANALYZE SAVINGS
                                    </p>

                                    <div className="grid grid-cols-2 gap-2 md:gap-3 w-full max-w-[300px] shrink-0">
                                        {[0, 1, 2, 3, 4, 5].map(i => {
                                            const item = box[i];
                                            return (
                                                <div
                                                    key={i}
                                                    onClick={() => removeProduct(i)}
                                                    className={`h-14 md:h-16 rounded-2xl border-2 flex items-center justify-center text-[0.65rem] md:text-xs cursor-pointer text-center p-2 transition-all ${item
                                                        ? "border-[#d4af37] bg-white/5 text-white font-semibold border-solid"
                                                        : "border-white/10 bg-white/5 border-dashed text-white/30"
                                                        }`}
                                                >
                                                    {item || (i + 1)}
                                                </div>
                                            )
                                        })}
                                    </div>

                                    <button
                                        disabled={box.length !== 6}
                                        onClick={runAnalysis}
                                        className={`w-full max-w-[300px] mt-6 py-3 rounded-full font-bold text-xs md:text-sm transition-all shrink-0 ${box.length === 6
                                            ? "bg-[#d4af37] text-[#0f2f2b] hover:translate-y-[-2px] shadow-lg cursor-pointer"
                                            : "bg-[#d4af37]/30 text-[#0f2f2b]/50 cursor-not-allowed"
                                            }`}
                                    >
                                        COMPLETE BUNDLE
                                    </button>

                                    <button
                                        onClick={resetSelection}
                                        className="mt-3 text-white/40 text-[0.65rem] underline cursor-pointer hover:text-white/60 transition-colors shrink-0"
                                    >
                                        Reset Selection
                                    </button>

                                    {/* 3. Report Overlay (Nested in right pane) */}
                                    {viewState === "report" && (
                                        <div className="absolute inset-0 md:inset-4 bg-[#0f2f2b] md:rounded-[20px] z-20 flex flex-col p-4 md:p-6 border-2 border-[#d4af37] overflow-y-auto w-full h-full animate-[slideUp_0.5s_ease-out]">
                                            {isAnalyzing && (
                                                <div className="m-auto text-center">
                                                    <svg
                                                        className="animate-spin mx-auto mb-6 text-[#d4af37]"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="50" height="50"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                                        <circle cx="12" cy="12" r="3"></circle>
                                                    </svg>
                                                    <h2 className="text-white font-serif text-xl md:text-2xl">
                                                        Analyzing Bio-Density...
                                                    </h2>
                                                </div>
                                            )}

                                            {showReportContent && (
                                                <div className="flex flex-col h-full">
                                                    <h2 className="font-serif text-xl md:text-2xl text-[#d4af37] mb-2 text-center md:text-left">
                                                        Smart Analysis
                                                    </h2>

                                                    <div className="bg-gradient-to-r from-[#f3d9c1] to-[#d97e5a] text-[#0f2f2b] p-3 rounded-xl text-center font-extrabold text-lg md:text-xl my-3 shadow-lg animate-pulse">
                                                        <span className="text-[0.6rem] block opacity-80 uppercase tracking-wide mb-1">
                                                            Coupon Unlocked
                                                        </span>
                                                        YODHA15
                                                    </div>

                                                    <div className="bg-white/5 rounded-xl p-3 md:p-4 mb-3 border border-white/5">
                                                        <table className="w-full border-collapse">
                                                            <thead>
                                                                <tr>
                                                                    <th className="text-[#d4af37] text-left text-[0.6rem] uppercase pb-2">Metric</th>
                                                                    <th className="text-[#d4af37] text-left text-[0.6rem] uppercase pb-2">Market</th>
                                                                    <th className="text-[#d4af37] text-left text-[0.6rem] uppercase pb-2">Yodha</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="text-[0.65rem] md:text-xs text-white">
                                                                {[
                                                                    ["Nutrients", "~90% Water", "100% Solute"],
                                                                    ["Shelf Life", "~5 Days", "12 Months"],
                                                                    ["Waste", "40%", "0%"],
                                                                    ["Density", "Standard", "4.2x Denser"]
                                                                ].map(([metric, market, yodha], idx) => (
                                                                    <tr key={idx} className="border-t border-white/5">
                                                                        <td className="py-1">{metric}</td>
                                                                        <td className="py-1 text-[#e74c3c] font-semibold">{market}</td>
                                                                        <td className="py-1 text-[#27ae60] font-semibold">{yodha}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                    <div className="flex justify-between px-2 mb-4">
                                                        <div className="text-white/60 text-[0.65rem]">
                                                            Fresh Equiv: <b className="text-white">12.5 KG</b>
                                                        </div>
                                                        <div className="text-[#27ae60] font-extrabold text-[0.65rem]">
                                                            ₹1,450 Saved
                                                        </div>
                                                    </div>

                                                    <div className="mt-auto">
                                                        <button
                                                            onClick={() => window.location.href = 'https://yodhafoods.com/discount/YODHA15'}
                                                            className="w-full bg-white text-[#0f2f2b] py-2 md:py-3 rounded-full font-bold text-xs shadow-md hover:bg-gray-100 transition-colors"
                                                        >
                                                            SECURE BUNDLE (15% OFF)
                                                        </button>
                                                        <button
                                                            onClick={editBundle}
                                                            className="w-full mt-2 text-white/50 text-[0.6rem] underline hover:text-white transition-colors"
                                                        >
                                                            Back to Edit
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </section>
                        )}
                    </main>
                </div>
                <style jsx global>{`
            .no-scrollbar::-webkit-scrollbar {
            display: none;
            }
            .no-scrollbar {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
            }
            @keyframes slideUp {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `}</style>
            </div>
        </div>
    );
}
