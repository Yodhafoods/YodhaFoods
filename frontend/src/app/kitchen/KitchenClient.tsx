"use client";

import { useState, useMemo } from "react";
import KitchenHero from "@/features/kitchen/components/KitchenHero";
import KitchenFilters from "@/features/kitchen/components/KitchenFilters";
import RecipeCard from "@/features/kitchen/components/RecipeCard";
import RecipeModal from "@/features/kitchen/components/RecipeModal";

// --- MOCK DATA ---
const RECIPES = [
    {
        id: "1",
        title: "30s Pink Chaas Ritual",
        image: "/assets/images/kitchen/green-detox.jpeg",
        time: "30",
        mealType: "snack",
        cuisine: "indian",
        tag: "SNACK • 30s",
    },
    {
        id: "2",
        title: "Zesty Mango Morning",
        image: "/assets/images/kitchen/mango.jpeg",
        time: "30",
        mealType: "breakfast",
        cuisine: "western",
        tag: "BREAKFAST • 30s",
    },
    {
        id: "3",
        title: "Moringa Power Lunch",
        image: "/assets/images/kitchen/moringa.jpg",
        time: "60",
        mealType: "lunch",
        cuisine: "western",
        tag: "LUNCH • 60s",
    },
    {
        id: "4",
        title: "Anti-Inflammatory Dal",
        image: "/assets/images/kitchen/dal.jpg",
        time: "60",
        mealType: "dinner",
        cuisine: "indian",
        tag: "DINNER • 60s",
    },
    {
        id: "5",
        title: "Golden Turmeric Latte",
        image: "/assets/images/kitchen/golden-l.jpg", // Reuse image/placeholder if needed
        time: "120",
        mealType: "snack",
        cuisine: "indian",
        tag: "SNACK • 2m",
    },
    {
        id: "6",
        title: "Quinoa Salad Bowl",
        image: "/assets/images/kitchen/salad.jpg", // Reuse
        time: "60",
        mealType: "lunch",
        cuisine: "western",
        tag: "LUNCH • 60s",
    },
    {
        id: "7",
        title: "Masala Oats",
        image: "/assets/images/kitchen/oats.jpeg", // Reuse
        time: "60",
        mealType: "breakfast",
        cuisine: "indian",
        tag: "BREAKFAST • 60s",
    },
    {
        id: "8",
        title: "Herbal Night Tea",
        image: "/assets/images/kitchen/herbal-tea.jpeg", // Reuse
        time: "30",
        mealType: "dinner",
        cuisine: "indian",
        tag: "DINNER • 30s",
    },
];

export default function KitchenClient() {
    // FILTERS
    const [time, setTime] = useState("all");
    const [meal, setMeal] = useState("all");
    const [style, setStyle] = useState("all");

    // FILTER LOGIC
    const filteredRecipes = useMemo(() => {
        return RECIPES.filter((r) => {
            const matchTime = time === "all" || r.time === time;
            const matchMeal = meal === "all" || r.mealType === meal;
            const matchStyle = style === "all" || r.cuisine === style;
            return matchTime && matchMeal && matchStyle;
        });
    }, [time, meal, style]);

    return (
        <section className="mb-24">
            {/* FILTER HUB */}
            <KitchenFilters
                time={time}
                setTime={setTime}
                meal={meal}
                setMeal={setMeal}
                style={style}
                setStyle={setStyle}
            />

            {/* RITUAL GRID */}
            {filteredRecipes.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {filteredRecipes.map((r) => (
                        <RecipeCard
                            key={r.id}
                            title={r.title}
                            image={r.image}
                            tag={r.tag}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">No rituals found matching your selection.</p>
                    <button
                        onClick={() => { setTime("all"); setMeal("all"); setStyle("all") }}
                        className="mt-4 text-[#2d4a22] font-semibold hover:underline"
                    >
                        Reset Filters
                    </button>
                </div>
            )}
        </section>
    );
}
