"use client";

import clsx from "clsx";

interface KitchenFiltersProps {
    time: string;
    setTime: (t: string) => void;
    meal: string;
    setMeal: (m: string) => void;
    style: string;
    setStyle: (s: string) => void;
}

const TIME_OPTIONS = [
    { label: "Any Time", value: "all" },
    { label: "30s Ritual", value: "30" },
    { label: "1m Ritual", value: "60" },
    { label: "Deep Mix", value: "120" },
];

const MEAL_OPTIONS = [
    { label: "All Day", value: "all" },
    { label: "Breakfast", value: "breakfast" },
    { label: "Lunch", value: "lunch" },
    { label: "Snack", value: "snack" },
    { label: "Dinner", value: "dinner" },
];

const STYLE_OPTIONS = [
    { label: "All Styles", value: "all" },
    { label: "Indian", value: "indian" },
    { label: "Western", value: "western" },
];

export default function KitchenFilters({
    time,
    setTime,
    meal,
    setMeal,
    style,
    setStyle,
}: KitchenFiltersProps) {
    return (
        <div className="flex flex-col items-center gap-2 w-full max-w-4xl mx-auto mb-6">
            {/* MOBILE DROPDOWNS (Visible only on mobile) */}
            <div className="md:hidden w-full px-4 mb-4">
                <span className="block text-xs font-extrabold tracking-widest text-[#c5a059] uppercase mb-2 text-center">
                    Filter Rituals
                </span>
                <div className="grid grid-cols-3 gap-2">
                    {/* TIME */}
                    <div className="relative">
                        <select
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded-lg text-xs font-bold leading-tight focus:outline-none focus:bg-white focus:border-[#2d4a22]"
                        >
                            {TIME_OPTIONS.map((t) => (
                                <option key={t.value} value={t.value}>{t.label.replace(" Ritual", "").replace(" Time", "Time")}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>

                    {/* MEAL */}
                    <div className="relative">
                        <select
                            value={meal}
                            onChange={(e) => setMeal(e.target.value)}
                            className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded-lg text-xs font-bold leading-tight focus:outline-none focus:bg-white focus:border-[#2d4a22]"
                        >
                            {MEAL_OPTIONS.map((m) => (
                                <option key={m.value} value={m.value}>{m.label}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>

                    {/* STYLE */}
                    <div className="relative">
                        <select
                            value={style}
                            onChange={(e) => setStyle(e.target.value)}
                            className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded-lg text-xs font-bold leading-tight focus:outline-none focus:bg-white focus:border-[#2d4a22]"
                        >
                            {STYLE_OPTIONS.map((s) => (
                                <option key={s.value} value={s.value}>{s.label}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* DESKTOP FILTERS (Hidden on mobile) */}
            <div className="hidden md:flex flex-col items-center w-full">
                {/* TIME (Row 1 - Pills) */}
                <div className="text-center">
                    <span className="block text-xs font-extrabold tracking-widest text-[#c5a059] uppercase mb-4">
                        How much time do you have?
                    </span>
                    <div className="flex justify-center flex-wrap gap-2">
                        {TIME_OPTIONS.map((t) => (
                            <button
                                key={t.value}
                                onClick={() => setTime(t.value)}
                                className={clsx(
                                    "px-6 py-2 rounded-full text-sm font-bold transition-all duration-300",
                                    time === t.value
                                        ? "bg-[#2d4a22] text-white shadow-lg scale-105"
                                        : "bg-white text-gray-500 hover:bg-gray-50 border border-transparent hover:border-gray-200"
                                )}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* COMBINED FILTERS ROW (Row 2 - Floating Bar Effect) */}
                <div className="flex flex-col md:flex-row items-center justify-center bg-gray-50/80 backdrop-blur-sm p-3 md:p-2 rounded-3xl md:rounded-full border border-gray-100 shadow-sm mt-2 w-full md:w-auto">
                    {/* MEAL TYPE */}
                    <div className="w-full md:w-auto flex flex-wrap justify-center items-center gap-1 px-2 md:px-4 border-b border-gray-200 md:border-b-0 md:border-r pb-2 md:pb-0 last:border-0 mb-2 md:mb-0">
                        {MEAL_OPTIONS.map((m) => (
                            <button
                                key={m.value}
                                onClick={() => setMeal(m.value)}
                                className={clsx(
                                    "px-3 md:px-4 py-2 md:py-3 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wide cursor-pointer transition-colors flex-grow md:flex-grow-0",
                                    meal === m.value
                                        ? "bg-[#2d4a22] text-white"
                                        : "text-gray-400 hover:bg-gray-200 hover:text-[#2d4a22]"
                                )}
                            >
                                {m.label}
                            </button>
                        ))}
                    </div>

                    {/* STYLE */}
                    <div className="w-full md:w-auto flex flex-wrap justify-center items-center gap-1 px-2 md:px-4">
                        {STYLE_OPTIONS.map((s) => (
                            <button
                                key={s.value}
                                onClick={() => setStyle(s.value)}
                                className={clsx(
                                    "px-3 md:px-4 py-2 md:py-3 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wide cursor-pointer transition-colors flex-grow md:flex-grow-0",
                                    style === s.value
                                        ? "bg-[#2d4a22] text-white"
                                        : "text-gray-400 hover:bg-gray-200 hover:text-[#2d4a22]"
                                )}
                            >
                                {s.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
