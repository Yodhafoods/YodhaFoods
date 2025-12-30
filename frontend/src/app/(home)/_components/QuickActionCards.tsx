"use client";

import { motion, Variants } from "framer-motion";
import {
    Gift,
    Percent,
    MessageSquarePlus,
    HeartPulse,
    Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { openDrawer } from "@/features/ui/store/uiSlice";

const cards = [
    {
        id: 1,
        title: "Bundle Your Box",
        subtitle: "Pick 6 products & unlock savings",
        icon: Gift,
        action: "/bundle",
        style: "bg-gradient-to-br from-[#f3d9c1] to-[#d97e5a] text-[#0f2f2b]",
        iconColor: "text-[#0f2f2b]",
        subColor: "text-[#0f2f2b]/80",
    },
    {
        id: 2,
        title: "New Coupons",
        subtitle: "Fresh offers just dropped",
        icon: Percent,
        action: "/shop",
        style: "bg-gradient-to-br from-yellow-300 to-amber-500 text-black",
        iconColor: "text-black",
        subColor: "text-black/70",
    },
    {
        id: 3,
        title: "Request a Product",
        subtitle: "Your wish is Yodha’s wish",
        icon: MessageSquarePlus,
        action: "/shop",
        style: "bg-gradient-to-br from-[#0a0a1f] to-[#050514] text-white border border-white/20",
        iconColor: "text-yellow-400",
        subColor: "text-white/60",
    },
    {
        id: 4,
        title: "Shop by Concern",
        subtitle: "Diabetes • Gut • Weight",
        icon: HeartPulse,
        action: "/shop-by-concern",
        style: "bg-[#0f2f2b] text-[#e6c36b]",
        iconColor: "text-[#e6c36b]",
        subColor: "text-[#e6c36b]/70",
    },
    {
        id: 5,
        title: "Today’s Ritual",
        subtitle: "Simple daily health mix",
        icon: Sparkles,
        action: "/kitchen",
        style: "bg-gradient-to-br from-orange-400 to-orange-600 text-white",
        iconColor: "text-white",
        subColor: "text-white/80",
    },
    {
        id: 6,
        title: "Why Yodha?",
        subtitle: "Single-ingredient • Organic-sourced • No fillers",
        icon: Sparkles,
        action: "/farms-and-sourcing",
        style: "bg-green-600 text-white",
        iconColor: "text-white",
        subColor: "text-white/90",
    },
];

export default function QuickActionCards() {
    const router = useRouter();
    const dispatch = useDispatch();

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    return (
        <div className="w-full overflow-x-auto no-scrollbar">
            <motion.div
                className="flex gap-3 px-2 md:px-12 py-3 min-w-max"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {cards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <motion.button
                            key={card.id}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, y: -5 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => {
                                if (card.id === 1) {
                                    dispatch(openDrawer());
                                } else {
                                    router.push(card.action);
                                }
                            }}
                            className={`
                                flex flex-col justify-center gap-2
                                w-[180px] h-[90px]
                                rounded-xl
                                p-3 text-left
                                shadow-md hover:shadow-lg
                                transition-all
                                cursor-pointer
                                ${card.style}
                            `}
                        >
                            <div className="flex items-center gap-2">
                                <Icon size={18} className={card.iconColor} />
                                <h4 className="text-sm font-bold leading-tight">
                                    {card.title}
                                </h4>
                            </div>

                            <p className={`text-[11px] font-medium leading-snug ${card.subColor}`}>
                                {card.subtitle}
                            </p>
                        </motion.button>
                    );
                })}
            </motion.div>
        </div>
    );
}
